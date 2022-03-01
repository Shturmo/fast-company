import httpService from "./http.service"

const professionEndPoint = "profession/"

const professionService = {
  fetchAll: async () => {
    const { data } = await httpService.get(professionEndPoint)
    return data
  },
}

export default professionService
