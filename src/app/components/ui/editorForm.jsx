import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import TextField from "../common/form/textField"
import SelectField from "../common/form/selectField"
import RadioField from "../common/form/radioField"
import MultiSelectField from "../common/form/multiSelectField"
import { validator } from "../../utils/validator"
import { useSelector, useDispatch } from "react-redux"
import { getQualities, getQualitiesLoadingStatus } from "../../store/qualities"
import {
  getProfessions,
  getProfessionsLoadingStatus,
} from "../../store/professions"
import { getCurrentUserData, updateUser } from "../../store/users"

const EditorForm = () => {
  const dispatch = useDispatch()

  const currentUser = useSelector(getCurrentUserData())
  const professions = useSelector(getProfessions())
  const professionsLoading = useSelector(getProfessionsLoadingStatus())
  const qualities = useSelector(getQualities())
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus())

  const [data, setData] = useState()
  const [errors, setErrors] = useState({})

  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id,
  }))
  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id,
  }))

  useEffect(() => {
    if (qualities.length > 0) {
      const transformedUserQualities = currentUser.qualities.map((id) => {
        const q = qualities.find((qual) => qual._id === id)
        return {
          label: q.name,
          value: q._id,
        }
      })
      setData({ ...currentUser, qualities: transformedUserQualities })
    }
  }, [qualities])

  useEffect(() => {
    validate()
  }, [data])

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Имя должно быть заполнено",
      },
      min: {
        message: "Имя должно состоять минимум из 3 символов",
        value: 3,
      },
    },
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: { message: "Email введен некорректно" },
    },
    profession: {
      isRequired: { message: "Обязательно выберите вашу профессию" },
    },
    qualities: {
      isRequired: { message: "Необходимо выбрать хотя бы одно качество" },
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

    const transformedBackUserQualities = data.qualities.map(
      (qual) => qual.value
    )
    dispatch(updateUser({ ...data, qualities: transformedBackUserQualities }))
  }

  return data && !professionsLoading && !qualitiesLoading ? (
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
        options={professionsList}
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
        options={qualitiesList}
        onChange={handleChange}
        defaultValue={data.qualities}
        name="qualities"
        label="Выберите ваши качества"
        error={errors.qualities}
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
    "loading editorForm"
  )
}

EditorForm.propTypes = {
  userId: PropTypes.string,
}

export default EditorForm
