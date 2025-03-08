import { useEffect, useState } from "react";
import axios from "axios"; // Don't forget to import axios
import api from "../../../api";

export default function Staff() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);



    useEffect(()=>{
        const fetchServices = async() =>{

            try{

                const response = await api.get('/services');
                setServices(response.data);

            }
            catch (error){
                console.error('Failing to fetch services', error);
            }



        }

        fetchServices();

}, []);



const handleServiceChange = (serviceId, checked) => {
    if (checked) {
      // Add service ID to the array if checked
      setSelectedServices([...selectedServices, serviceId]);
    } else {
      // Remove service ID from the array if unchecked
      setSelectedServices(selectedServices.filter((id) => id !== serviceId));
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { name, email, phone_number, isAvailable, service_id: selectedServices };

    try {
      const response = await api.post('/addStaff', formData);
      console.log("Staff added successfully", response.data);
    } catch (error) {
      console.error('Problem Adding staff', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone"
          value={phone_number}
          onChange={(e) => setPhone_number(e.target.value)}
        />

        <div>
        {services.map((service) => (
        <label key={service.id}>
            
        <input
        type="checkbox"
        checked={selectedServices.includes(service.id)}
        value={service.id}
        onChange={(e)=> handleServiceChange(Number(e.target.value), e.target.checked)}
        />
            {service.name}
        </label>
    ))}

        </div>

        <input
          type="checkbox"
          name="isAvailable"
          checked={isAvailable}
          onChange={(e) => setIsAvailable(e.target.checked)}
        />
        IsAvailable
        <button type="submit">Submit</button>
      </form>
 

   
      
    </>
  );
}
