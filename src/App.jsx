import './App.css';
import axios from 'axios';
import { useState } from 'react';
import RingLoader from "react-spinners/RingLoader";

function App() {
    let [input, setInput] = useState('')
    let [address, setAddress] = useState([]);
    let [company, setCompany] = useState([]);
    let [act, setAct] = useState([]);
    let [sideAct, setSideAct] = useState([]);
    let [loading, setLoading] = useState(0);

    const config = {
        method: 'get',
        url: `https://api.cnpja.com/office/${input}`,
        headers: {
            Authorization:
                '2cb3f9dc-8be3-47db-ba53-0d530019c5a8-f8ea241e-1a3b-43fb-858d-7f1343ff6058',
        },
    };

    let handdleReq = async function fetchData(e) {
        setLoading(1)
        e.preventDefault()
        try {
            let response = await axios(config);
            console.log(response.data);
            setAddress(response.data.address);
            setCompany(response.data.company);
            setAct(response.data.mainActivity);
            setSideAct(response.data.sideActivities);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(2);
        }
    }
    return (
        <div className="App">
            <header className="App-header">
                <input type="text" name="cnpj" value={input} placeholder="00.000.000/0000-00" onChange={(event)=>setInput(event.target.value.replace(/[./-]/g, ''))} required autoFocus/>
                <button type="submit" onClick={e=>handdleReq(e)}>Pesquisar</button>
            </header>
            <main className="App-main">
                <div>
                    {loading === 0 ? (
                        <p></p>
                    ) : loading ===1 ? (
                        <div style={{display:"flex",alignItems:"center" ,gap:"32px", height:"200px"}}>
                            <p>Carregando... </p>
                            <RingLoader color="#36d7b7"/>
                        </div>

                        ) : (
                        <div className="data">
                            <p><span style={{color:"#36d7b7"}}>Razão Social:</span> {company.name}</p>
                            <p><span style={{color:"#36d7b7"}}>Endereço:</span> {address.city}, {address.state}</p>
                            <p><span style={{color:"#36d7b7"}}>Tamanho:</span> {company.size.text}</p>
                            <p><span style={{color:"#36d7b7"}}>Atividade Principal:</span> {act.text}</p>
                            <details style={{cursor:"pointer"}}>
                                <summary><span style={{color:"#36d7b7"}}>Atividades Secundárias</span></summary>
                                <ol>
                                {sideAct.map((item, index) => (
                                    <li key={item.id}>{item.text}</li>
                                ))}
                                </ol>
                            </details>
                        </div>
                    )}
                </div>
            </main>
            <footer className="App-footer">Coded by Luiz</footer>
        </div>
    );
}

export default App;
