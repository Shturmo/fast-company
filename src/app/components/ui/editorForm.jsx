import React, { useState, useEffect } from "react"
import api from "../../api"
import PropTypes from "prop-types"
import TextField from "../common/form/textField"
import SelectField from "../common/form/selectField"
import RadioField from "../common/form/radioField"
import MultiSelectField from "../common/form/multiSelectField"
import { validator } from "../../utils/validator"
import { useHistory } from "react-router-dom"

const EditorForm = ({ id }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: [],
  })
  const [errors, setErrors] = useState({})
  const [professions, setProfessions] = useState()
  const [qualities, setQualities] = useState({})
  const history = useHistory()

  useEffect(() => {
    api.users.getById(id).then((user) => {
      const qualitiesArray = user.qualities.map((qualitie) => ({
        label: qualitie.name,
        value: qualitie._id,
      }))

      setData((prevState) => ({
        ...prevState,
        name: user.name,
        email: user.email,
        profession: user.profession._id,
        sex: user.sex,
        qualities: qualitiesArray,
      }))
    })
    api.professions.fetchAll().then((data) => {
      setProfessions(data)
    })
    api.qualities.fetchAll().then((data) => {
      setQualities(data)
    })
  }, [])

  useEffect(() => {
    validate()
  }, [data])

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Имя должно быть заполнено",
      },
    },
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: { message: "Email введен некорректно" },
    },
    profession: {
      isRequired: { message: "Обязательно выберите вашу профессию" },
    },
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return

    const updatedProf = Object.keys(professions).find(
      (prof) => professions[prof]._id === data.profession
    )
    const updatedQualities = data.qualities.map((dataQual) =>
      Object.keys(qualities).find(
        (qual) => qualities[qual]._id === dataQual.value
      )
    )

    const updatedData = {
      name: data.name,
      email: data.email,
      sex: data.sex,
      profession: professions[updatedProf],
      qualities: updatedQualities.map((updatedQual) => qualities[updatedQual]),
    }
    api.users.update(id, updatedData).then(() => {
      history.push(`/users/${id}`)
    })
  }

  return professions && qualities ? (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <SelectField
        label="Выберите свою профессию"
        defaultOption="Choose..."
        name="profession"
        options={professions}
        onChange={handleChange}
        value={data.profession}
        error={errors.profession}
      />
      <RadioField
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "Other", value: "other" },
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="Выберите ваш пол"
      />
      <MultiSelectField
        options={qualities}
        onChange={handleChange}
        defaultValue={data.qualities}
        name="qualities"
        label="Выберите ваши качества"
      />
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Обновить
      </button>
    </form>
  ) : (
    "Loading..."
  )
}

EditorForm.propTypes = {
  id: PropTypes.string,
}

export default EditorForm
