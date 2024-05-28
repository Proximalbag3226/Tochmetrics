import React from 'react'
import Graphic from '../components/graphic'
import { Container } from "reactstrap";

const graphicData = {
    labels: ["Anot", "Ob", "Sack", "Inter", "P.ex", "P.anot", "Ob"],
    datasets: [
        {
            label: "Primera mitad",
            data: [30, 5, 10, 25, 13, 15, 7],
            backgroundColor: [
                "rgba(190, 52, 127)",
                "rgba(190, 52, 58)",
                "rgba(190, 115, 52)",
                "rgba(190, 184, 52)",
                "rgba(127, 190, 52)",
                "rgba(58, 190, 52)",
            ],
            hoverOffset: 4,
        },
    ],
};

function Torneos() {
    return (
        <Container>
            <h1>Mi Gráfico</h1>
            <Graphic data={graphicData} />
        </Container>
    );
}

export default Torneos