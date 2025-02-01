import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { BASE_URL } from "../../constants";
import Grid from '@mui/material/Grid2';
import { Container } from "@mui/material";


const Details = () => {

    const [clothes, setClothes] = useState(null)
    const { id } = useParams()


    const getClothes = async () => {
        try {
            const res = await axios(`${BASE_URL}clothes/${id}`)
            setClothes(res.data)
            console.log(res.data);

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        if (id) {
            getClothes()
        }


    }, [])




    return (
        <>
            {clothes ? <Container>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <img src={clothes.imageUrl} alt={clothes.title} width={400} />
                    </Grid>
                    <Grid size={6} style={{ display: "flex", flexDirection: 'column', gap: "1rem", justifyContent: "center" }}>
                        <h3>Title: {clothes.title}</h3>
                        <p>{clothes.description}</p>
                        <p>Price: $ {clothes.price}</p>
                    </Grid>

                </Grid>
            </Container > : <h2>no such clothes!</h2>
            }
        </>
    )
}

export default Details