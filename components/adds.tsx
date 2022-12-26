import React, { useEffect, useState } from 'react'
import styles from './Adds.module.css'

const Adds = (props: any) => {
    const [video, setVideo] = useState([
        '/videos/LALA Helados Frutos Silvestres 10 segundos.mp4',
        '/videos/Spot Lady Velvet 10 seg.mp4',
        '/videos/Campaña Coca-Cola Energy - 10 segundos.mp4',
        '/videos/Lanzamiento Cheetos Popcorn Chocolate, Spot 15 segundos..mp4',
        '/videos/Red Bull Baber Shop.mp4',
        '/videos/FLORA Gold 10 segundos.mp4',
        '/videos/Anuncio TV -  Precio Final Final - Rastreator.com® _ Spot 10 segundos.mp4',
        '/videos/Nuevo spot Leche Pascual Salud  30 Segundos.mp4',
        '/videos/hamburguesa.mp4'
    ])
    const [numVideo, setNumVideo] = useState(props.video)
    const [showVideo, setShowVideo] = useState(false)
    const [Ended, setEnded] = useState(false)
    const [grupoVid, setGrupoVid] = useState(0)
    const [existVid, setExistVideo] = useState(true)

    const VideoFinalizado = (pageReturn: string) => {
        console.log("Video Finalizado");
        setGrupoVid(grupoVid + 1)
        console.log(grupoVid);
        if (grupoVid == 2) {
            setShowVideo(false)
            props.numeroVideoReturn(numVideo)
            props.videoReturn(pageReturn)
        }
        setExistVideo(false)
        setTimeout(() => {
            setExistVideo(true)
            setNumVideo(numVideo + 1)
            if (numVideo >= video.length -1) {
                setNumVideo(0)
            }
        }, 1);

    }
    const EndFinalizado = (pageReturn: string) => {
        console.log("End Finalizado");
        props.videoReturn(pageReturn)
    }

    // });
    // ?-------------------------------------------------
    return (
        <div className={styles.Adds}>
            {showVideo ?
                <div>
                    {/* <h2>Transparentes</h2> */}
                    {existVid ?
                        <video autoPlay muted onEnded={() => VideoFinalizado("finalizado")}>
                            <source src={video[numVideo]} />
                        </video>
                        : ""
                    }
                    <h1>Video Patrocinado</h1>
                </div>
                :
                <div onAnimationEnd={() => setShowVideo(true)} className={styles.accesaAdds}>
                    <h1 >Accesa Adds</h1>
                    <h2>Cargando ...</h2>
                </div>
            }
            {/* {Ended ?
                <div onAnimationEnd={()=> EndFinalizado("finalizado")} className={styles.ended}>
                    <h1>Terminando Add</h1>
                </div>
                : ""
            } */}
        </div>
    )
}

export default Adds