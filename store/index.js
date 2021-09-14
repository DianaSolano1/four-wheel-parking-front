export const state = () => ({
  contentType: '',
})

export const mutations = {
  setContentType(state, position) {
    switch (position) {
      case 'form-data':
        state.contentType = 'multipart/form-data'
        break
      default:
        state.contentType = 'application/json'
        break
    }
  },
}

export const actions = {
  async apiServices({ dispatch }, settings) {
    try {
      if (settings.contentType === 'form-data') {
        const formData = new FormData()

        Object.entries(settings.form.content).forEach((key) => {
          formData.append(key[0], key[1])
        })

        settings.form.content = formData
      }

      const result = await dispatch(`crud/${settings.type}`, settings.form)

      return result
    } catch (e) {
      const error = JSON.parse(JSON.stringify(e))

      // eslint-disable-next-line no-console
      console.error('Error en el Store: ', e, error)

      if (error.code === 'ECONNABORTED')
        // ? Error por timeout
        return {
          success: false,
          message:
            'Ha tardado demasiado en responder. Intente nuevamente más tarde',
          error,
        }

      if (e.response) {
        if (e.response.status === 401) {
          await dispatch('logout')
        } else if (e.response.status === 404) {
          if (e.response.data.error && e.response.data.error.message) {
            return {
              success: false,
              message: e.response.data.error.message,
              error: e,
            }
          } else {
            // ? No encontró el servicio
            return {
              success: false,
              message:
                'No se encontró la url solicitada. Intente nuevamente más tarde',
              error,
            }
          }
        } else if (e.response.data.error && e.response.data.error.message) {
          return {
            success: false,
            message: e.response.data.error.message,
            error: e,
          }
        } else {
          return {
            success: false,
            message:
              'Ocurrió un error en el servidor. Intente nuevamente más tarde',
            error: e,
          }
        }
      } else {
        return {
          success: false,
          message:
            'Ocurrió un error en el servidor. Intente nuevamente más tarde',
          error: e,
        }
      }
    }
  },
}
