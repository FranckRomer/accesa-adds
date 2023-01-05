import React, { useState } from 'react'
import styles from './Page1.module.css'
import Image from 'next/image'

const Page1 = () => {
    const [hora, setHora] = useState("Autobuses Train Accesa")
    const [error, setError] = useState(null)
    const [paradas, setParadas] = useState([
        "Valsequillo", "CU", "Bomberos", "Cristal", "Dorada", "Clinica", "Centro", "San Francisco", "Fuertes", "China Poblana", "Cuchilla", "Capu", "Boulevard sur", "Telmex", "Noria", "Angelopolis", "Globo", "Via Atlixcayotl"
    ])
    const [parada, setParada] = useState(0)
    const [paradaActual, setParadaActual] = useState(paradas[parada])
    const [paradaSiguiente, setParadaSiguiente] = useState(paradas[parada + 1])
    const [cambioParada, setCambioParada] = useState(0)
    return (
        <main className={styles.main}>
            {/* <div className={styles.linea}></div> */}
            {/* <h3 className={styles.accesa}>Accesa Adds</h3> */}
            <div className={styles.paradas_puntos}>
                {paradas.map((user, index) => (
                    <div key={index}>
                        {paradaActual == user ?
                            <div >
                                <h4 className={styles.selection_img} >
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
                                {parada > index + 1 ?
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

            {/* //? ---------------------------------- */}
            <section className={styles.unidades}>
                <div className={styles.unidad}>
                    <h4>Ruta</h4>
                    <h2>Selva-Maya</h2>
                </div>
                <div className={styles.unidad}>
                    <h4>Unidad</h4>
                    <h2>014</h2>
                </div>
                <div className={styles.unidad}>
                    <h4>Ramal</h4>
                    <h2>Capu</h2>
                </div>
            </section>
            <section className={styles.paradas_contain}>
                {/* //? ---------------------------------- */}

                <div className={styles.paradas}>
                    <h1>Paradas de la Ruta</h1>
                    <ul className={styles.parada}>
                        {paradas.map((user, index) => (
                            <li key={index}>
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

    )
}

export default Page1