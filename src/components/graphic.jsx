import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as chartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { Container } from "reactstrap";

chartJS.register(Tooltip, Legend, ArcElement);

export const Graphic = ({ data }) => {
    const options = {};

    return (
        <Container>
            <Pie options={options} data={data} />
        </Container>
    );
};

export default Graphic;
