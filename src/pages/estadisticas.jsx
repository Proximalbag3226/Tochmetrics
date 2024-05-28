import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'reactstrap';
import DataTable from '../components/date_table';
import ModalForm from '../components/modal_form';
import Cards from '../components/cards';
import '../components/cards.css'

function Estadisticas(){
    return(
        <div className='App'>
            <Cards/>
        </div>
    );
};

export default Estadisticas;