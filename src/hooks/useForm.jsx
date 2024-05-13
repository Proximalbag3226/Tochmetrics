import { useState } from "react";


const useForm(initialvalues) => {
    const [values, setValues] = useState(initialvalues);

    const handleChange = (e) =>{
        const { name, value } = e.target
        setValues({..values, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(values)
    }

};

return useForm