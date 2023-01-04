import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Adds from '../components/adds'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Page1 from '../components/pages/page1/page1'
import Page2 from '../components/pages/page2/page2'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [adds, setAdds] = useState(false)
  const [hora, setHora] = useState("Autobuses Train Accesa")
  const [minuto, setMinuto] = useState("Autobuses Train Accesa")
  const [diesSegundos, setDiesSegundos] = useState("Autobuses Train Accesa")
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
      // console.log("1 Segundo esperado")
    }, 1000);
  });

  const getHora = async () => {
    try {
      // const getHora = await fetch("api/getHora/getHora")
      const res = await axios.get('api/getHora/')
      const data = res.data
      // console.log(data);
      setHora(data.horaCompleta)
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
    const minutos = parseInt(hora.slice(-4, -3));
    const diesSegundos = parseInt(hora.slice(-2, -1));
    console.log("minuto:" + minutos + ", segundo" + diesSegundos);
    if (!adds) {
      if (diesSegundos == 0 && (minutos == 0 || minutos == 5)) {

        setVideo(video + 1)
        if (video > 7) { setVideo(0) }
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
    if (diesSegundos == 5 && cambioParada == 0) {
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
      
      {/* <Page1></Page1> */}
      <Page2></Page2>


      {/* // *-------------------------------------- */}
      {!!adds ?
        <Adds video={video} videoReturn={pageReturn} numeroVideoReturn={numeroVideoReturn}></Adds>
        : ""}
    </>
  )
}
