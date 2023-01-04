import React, { useState } from 'react'
import styles from './Page2.module.css'
import Image from 'next/image'

const Page2 = () => {
    const [paradas, setParadas] = useState([
        "Valsequillo", "CU", "Bomberos", "Cristal", "Dorada", "Clinica", "Centro", "San Francisco", "Fuertes", "China Poblana", "Cuchilla", "Capu", "Boulevard sur", "Telmex", "Noria", "Angelopolis", "Globo", "Via Atlixcayotl"
    ])
    const [parada, setParada] = useState(9)
    const [paradaAnterior] = useState(paradas[parada - 1])
    const [paradaActual, setParadaActual] = useState(paradas[parada])
    const [paradaSiguiente, setParadaSiguiente] = useState(paradas[parada + 1])
    return (
        <main className={styles.main}>
            <section className={styles.lista_paradas}>
                {paradas.map((user, index) => (
                    <div>
                        {paradaActual == user ?
                            <div >
                                <h4>{user}</h4>
                                <h4 className={styles.selection} >{index + 1}</h4>
                                <h4 className={styles.selection_img} >
                                    <Image
                                        src="/icons/posicion.png"
                                        alt="Posicion"
                                        width={50}
                                        height={50}
                                    />
                                </h4>
                            </div>
                            :
                            <div>
                                {parada > index ?
                                    <div className={styles.puntocontian} >
                                        <p>{user}</p>
                                        <p >{index + 1}</p>
                                        {/* <Image
                                            className={styles.gris}
                                            src="/icons/parada.png"
                                            alt="Posicion"
                                            width={30}
                                            height={30}
                                        /> */}
                                        <div className={styles.puntoNegro}></div>
                                    </div>
                                    :
                                    <div className={styles.puntocontian}>
                                        <p>{user}</p>
                                        <p >{index + 1}</p>
                                        {/* <Image
                                            src="/icons/parada.png"
                                            alt="Posicion"
                                            width={30}
                                            height={30}
                                        /> */}
                                        <div className={styles.puntoVerde}></div>
                                    </div>

                                }
                            </div>
                        }
                    </div>
                ))}
            </section>
            <section className={styles.paradas}>
                <div className={styles.paradaAnterior}>
                    <h1>Parada Anterior</h1>
                    <Image
                        src="/icons/parada.png"
                        alt="Posicion"
                        width={100}
                        height={100}
                    />
                    <p>
                        {paradaAnterior}
                    </p>
                </div>
                <div className={styles.paradaActual}>
                    <h1>Parada Actual</h1>
                    <Image
                        src="/icons/posicion.png"
                        alt="Posicion"
                        width={150}
                        height={150}
                    />
                    <p>
                        {paradaActual}
                    </p>
                </div>
                <div className={styles.paradaSiguiente}>
                    <h1>Parada Siguiente</h1>
                    <Image
                        src="/icons/parada.png"
                        alt="Posicion"
                        width={120}
                        height={120}
                    />
                    <p>
                        {paradaSiguiente}
                    </p>
                </div>
            </section>
            <section className={styles.footer}>
                <div className={styles.footer_ruta}>
                    <div>
                        <p>Ruta</p>
                        <h3>Selva - Maya</h3>
                    </div>
                    <div>
                        <p>Unidad</p>
                        <h3>117</h3>
                    </div>
                </div>
                <div className={styles.footer_info}>
                    <Image
                        src="/icons/play.png"
                        alt="Posicion"
                        width={30}
                        height={30}
                    />
                    <Image
                        src="/icons/wifi.png"
                        alt="Posicion"
                        width={30}
                        height={30}
                    />
                </div>
            </section>
        </main>
    )
}

export default Page2