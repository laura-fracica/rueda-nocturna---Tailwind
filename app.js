(() => {
  'use strict'

  const menuBoton = document.getElementById('menu-boton')
  const menu = document.getElementById('menu-principal')

  if (menuBoton && menu) {
    menuBoton.addEventListener('click', () => {
      const abierto = menuBoton.getAttribute('aria-expanded') === 'true'
      menuBoton.setAttribute('aria-expanded', String(!abierto))
      menu.classList.toggle('hidden', abierto)
    })
  }

  const carrusel = document.querySelector('[data-carrusel]')

  if (carrusel) {
    const slides = Array.from(carrusel.querySelectorAll('[data-carrusel-slide]'))
    const pista = carrusel.querySelector('[data-carrusel-pista]')
    const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)')
    let actual = 0
    let temporizador = null

    const mostrar = (indice) => {
      actual = (indice + slides.length) % slides.length
      slides.forEach((slide, i) => {
        if (i === actual) {
          slide.setAttribute('data-activa', '')
        } else {
          slide.removeAttribute('data-activa')
        }
      })
    }

    const detener = () => {
      clearInterval(temporizador)
      temporizador = null
      pista.setAttribute('aria-live', 'polite')
    }

    const iniciar = () => {
      if (reducirMovimiento.matches || temporizador) {
        return
      }
      pista.setAttribute('aria-live', 'off')
      temporizador = setInterval(() => mostrar(actual + 1), 5000)
    }

    carrusel.querySelector('[data-carrusel-anterior]').addEventListener('click', () => mostrar(actual - 1))
    carrusel.querySelector('[data-carrusel-siguiente]').addEventListener('click', () => mostrar(actual + 1))
    carrusel.addEventListener('mouseenter', detener)
    carrusel.addEventListener('mouseleave', iniciar)
    carrusel.addEventListener('focusin', detener)
    carrusel.addEventListener('focusout', iniciar)

    mostrar(0)
    iniciar()
  }

  document.querySelectorAll('[data-cerrar]').forEach((boton) => {
    boton.addEventListener('click', () => {
      const objetivo = document.getElementById(boton.getAttribute('data-cerrar'))
      if (objetivo) {
        objetivo.remove()
      }
    })
  })

  document.querySelectorAll('[data-abrir-modal]').forEach((boton) => {
    boton.addEventListener('click', () => {
      const modal = document.getElementById(boton.getAttribute('data-abrir-modal'))
      if (modal) {
        modal.showModal()
      }
    })
  })

  document.querySelectorAll('dialog').forEach((modal) => {
    modal.querySelectorAll('[data-cerrar-modal]').forEach((boton) => {
      boton.addEventListener('click', () => modal.close())
    })
    modal.addEventListener('click', (evento) => {
      if (evento.target === modal) {
        modal.close()
      }
    })
  })

  // Interacción entre botones de Rutas/Planes y el formulario de inscripción
  const selectRuta = document.getElementById('ruta')
  const inputAcompanantes = document.getElementById('acompanantes')

  const resaltarCampo = (campo) => {
    if (!campo) return
    campo.focus()
    campo.classList.add('ring-4', 'ring-naranja-pedal', 'dark:ring-amarillo-farol')
    setTimeout(() => {
      campo.classList.remove('ring-4', 'ring-naranja-pedal', 'dark:ring-amarillo-farol')
    }, 1500)
  }

  document.querySelectorAll('[data-seleccionar-ruta]').forEach((boton) => {
    boton.addEventListener('click', (evento) => {
      evento.preventDefault()
      const valorRuta = boton.getAttribute('data-seleccionar-ruta')
      if (selectRuta) {
        selectRuta.value = valorRuta
        selectRuta.dispatchEvent(new Event('change', { bubbles: true }))
        selectRuta.scrollIntoView({ behavior: 'smooth', block: 'center' })
        resaltarCampo(selectRuta)
      }
    })
  })

  document.querySelectorAll('[data-seleccionar-plan]').forEach((boton) => {
    boton.addEventListener('click', (evento) => {
      evento.preventDefault()
      const cantidad = boton.getAttribute('data-seleccionar-plan')
      if (inputAcompanantes) {
        inputAcompanantes.value = cantidad
        inputAcompanantes.dispatchEvent(new Event('input', { bubbles: true }))
        inputAcompanantes.scrollIntoView({ behavior: 'smooth', block: 'center' })
        resaltarCampo(inputAcompanantes)
      }
    })
  })

  document.querySelectorAll('form[data-inscripcion]').forEach((formulario) => {
    const mensaje = document.getElementById('inscripcion-confirmacion')

    formulario.addEventListener('submit', (evento) => {
      evento.preventDefault()
      formulario.reset()
      if (mensaje) {
        mensaje.classList.remove('hidden')
        mensaje.focus()
      }
    })

    formulario.addEventListener('input', () => {
      if (mensaje) {
        mensaje.classList.add('hidden')
      }
    })
  })

  document.querySelectorAll('form[data-validar]').forEach((formulario) => {
    const controles = Array.from(formulario.elements).filter((el) => el.willValidate)
    let intentado = false

    const actualizar = (control) => {
      const mensaje = document.getElementById(control.id + '-error')
      const invalido = !control.validity.valid
      control.setAttribute('aria-invalid', String(invalido))
      if (mensaje) {
        mensaje.classList.toggle('hidden', !invalido)
      }
    }

    formulario.addEventListener('submit', (evento) => {
      intentado = true
      controles.forEach(actualizar)
      if (!formulario.checkValidity()) {
        evento.preventDefault()
        const primero = controles.find((control) => !control.validity.valid)
        if (primero) {
          primero.focus()
        }
      }
    })

    controles.forEach((control) => {
      const revisar = () => {
        if (intentado) {
          actualizar(control)
        }
      }
      control.addEventListener('input', revisar)
      control.addEventListener('change', revisar)
    })
  })
})()