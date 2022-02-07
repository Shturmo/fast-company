import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import NavBar from "./components/ui/navBar"
import { ProfessionProvider } from "./hooks/useProfession"
import { QualitiesProvider } from "./hooks/useQualities"
import Login from "./layouts/login"
import Main from "./layouts/main"
import Users from "./layouts/users"

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path={"/"} exact component={Main} />
        <QualitiesProvider>
          <ProfessionProvider>
            <Route path={"/login/:type?"} component={Login} />
            <Route path={"/users/:userId?/:edit?"} component={Users} />
          </ProfessionProvider>
        </QualitiesProvider>
        <Redirect to="/" />
      </Switch>
      <ToastContainer />
    </div>
  )
}

export default App
