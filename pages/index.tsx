import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Adds from '../components/adds'
import { useEffect, useState } from 'react'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [adds, setAdds] = useState(false)
  const [hora, setHora] = useState("Autobuses Train Accesa")
  const [error, setError] = useState(null)
  const [video, setVideo] = useState(-1)
  const [videoReturn, setVideoReturn] = useState("")
  const [paradas, setParadas] = useState([
    "Valsequillo", "CU", "Bomberos", "Cristal", "Dorada", "Clinica", "Centro", "San Francisco", "Fuertes", "China Poblana", "Cuchilla", "Capu", "Boulevard sur", "Telmex", "Noria", "Angelopolis", "Globo", "Via Atlixcayotl"
  ])
  const [parada, setParada] = useState(0)
  const [paradaActual, setParadaActual] = useState(paradas[parada])
  const [paradaSiguiente, setParadaSiguiente] = useState(paradas[parada + 1])
  const [cambioParada, setCambioParada] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      getHora();
      mostrarAdds();

    }, 1000);
  });

  const getHora = async () => {
    // console.log("1 Segundo esperado")
    try {
      // const getHora = await fetch("api/getHora/getHora")
      const res = await axios.get('api/getHora/')
      const data = res.data
      // console.log(data);
      setHora(data)
      // setHora(getHora)
    } catch (error: any) {
      setError(error.message)
    }
  }

  const pageReturn = (pageReturn: any) => {
    setVideoReturn(pageReturn);
  }
  const numeroVideoReturn = (numeroVideoRet: any) => {
    setVideo(numeroVideoRet)
  }

  const mostrarAdds = () => {
    const minuto = hora.slice(-7, -6);
    const dies_segundo = hora.slice(-4, -3);
    // console.log("minuto:" + minuto + ", segundo" + dies_segundo);
    if (!adds) {
      if (dies_segundo == '0' && (minuto == '0' || minuto == '5')) {

        setVideo(video + 1)
        if (video > 7) {
          setVideo(0)
        }
        setAdds(true)
        console.log("Se muestra el anuncio");
      }
    }
    else {
      console.log("esperando a que termine el video");
      // setAdds(false)
    }

    if (videoReturn == "finalizado") {
      console.log("Video Terminado");
      setAdds(false)
      setVideoReturn("")
    }
    if (dies_segundo == '5' && cambioParada == 0) {
      setCambioParada(1)
      setTimeout(() => {
        if (parada < paradas.length) {
          console.log("Siguiente PARADA");

          setParada(parada + 1)
          setParadaActual(paradas[parada])
          setParadaSiguiente(paradas[parada + 1])
        } else {
          setParada(0)
        }
        setCambioParada(1)
        setTimeout(() => {
          console.log("cambio de parada");
          setCambioParada(0)
        }, 500);
      }, 1000);
    }
  }



  // ?-------------------------------------------------
  return (
    <>
      <Head>
        <title>Accesa Adds</title>
        <meta name="description" content="Videos de publicidad para accesa" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* // *------------------------------------------- */}
      <main className={styles.main}>
        <div className={styles.linea}></div>
        {/* <h3 className={styles.accesa}>Accesa Adds</h3> */}
        <div className={styles.paradas_puntos}>
          {paradas.map((user, index) => (
            <div>
              {paradaActual == user ?
                <div >
                  <h4  className={styles.selection_img} >
                    <Image
                      src="/icons/posicion.png"
                      alt="Posicion"
                      width={50}
                      height={50}
                    />
                  </h4>
                  <h4 className={styles.selection} >{index + 1}</h4>
                </div>
                :
                <div>
                  {parada > index ?
                    <div className={styles.puntocontian} >
                      <div className={styles.puntoNegro}></div>
                      <p >{index + 1}</p>
                    </div>
                    :
                    <div className={styles.puntocontian}>
                      <div className={styles.puntoVerde}></div>
                      <p >{index + 1}</p>
                    </div>

                  }
                </div>
              }
            </div>
          ))}
        </div>
        <section className={styles.paradas_contain}>

          <div className={styles.paradas}>
            <ul className={styles.parada}>
              {paradas.map((user) => (
                <li>
                  {paradaActual == user ?
                    <h4 className={styles.selection} >{user}</h4>
                    :
                    <p >{user}</p>
                  }
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.info}>

            <div className={styles.tiempoSiguiente}>
              <h1 >Tiempo para siguiente Parada</h1>
              <div className={styles.tiempo}>
                <h1>{hora}</h1>
              </div>
            </div>
            {/* <hr /> */}


            <div className={styles.visual_paradaAS}>
              <div className={styles.info_parada_actual}>
                <h1>Parada Actual</h1>
                <div className={styles.paradaActual}>
                  {cambioParada === 0 ?
                    <h1>{paradaActual}</h1>
                    :
                    <h2>{paradaActual}</h2>
                  }
                </div>
              </div>
              {/* -------------------------------------- */}
              <div className={styles.info_parada_actual}>
                <h1>Parada Siguiente</h1>
                <div className={styles.paradaSiguiente}>
                  {cambioParada === 0 ?
                    <h1>{paradaSiguiente}</h1>
                    :
                    <h2>{paradaSiguiente}</h2>
                  }
                </div>
              </div>
              {/* <div>
                <h1>Selva Negra</h1>
              </div> */}
            </div>


          </div>

        </section>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </main>

      {/* // *-------------------------------------- */}
      {!!adds ?
        <Adds video={video} videoReturn={pageReturn} numeroVideoReturn={numeroVideoReturn}></Adds>
        : ""}
    </>
  )
}
