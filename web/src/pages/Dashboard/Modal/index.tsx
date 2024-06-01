import { Box, Checkbox, FormControlLabel, FormGroup, Modal, Switch } from "@mui/material";
import Titulo from "../../../components/Titulo";
import styled from "styled-components";
import { useState } from "react";
import CampoDigitacao from "../../../components/CampoDigitacao";
import SwitchCustomizado from "../../../components/Switch";
import Botao from "../../../components/Botao";
import Subtitulo from "../../../components/Subtitulo";
import IProfissional from "../../../types/IProfissional";
import usePost from "../../../usePost";
import autenticaStore from "../../../stores/autentica.store";

const BoxCustomizado = styled(Box)`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 30vw;
max-height: 90vh;
overflow-y: auto;
background-color: white;
border: none;
border-radius: 16px;
padding: 1em 5em;
`

const Formulario = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 65% 30%;
  justify-content: space-between
`;

const ContainerSwitch = styled.div`
text-align: center;
`

const TextoSwitch = styled.p`
color: var(--cinza);
`

const BotaoCustomizado = styled(Botao)`
    width: 50%;
    display: block;
    margin: 0 auto;
`

const ModalCadastro = ({open, handleClose}: {open: boolean, handleClose: () => void}) => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [crm, setCrm] = useState('');
    const [telefone, setTelefone] = useState('');
    const [imagem, setImagem] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [estado, setEstado] = useState('');
    const [atendePorPlano, setAtendePorPlano] = useState(false);
    const label = { inputProps: { 'aria-label': 'Atende por plano?' } };
    const [planosSelecionados, setPlanosSelecionados] = useState<string[]>([]);

    const {usuario} = autenticaStore;
    const { cadastrarDados } = usePost();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxValue = event.target.value;
        if (event.target.checked) {
            setPlanosSelecionados([...planosSelecionados, checkboxValue]);
        } else {
            setPlanosSelecionados(planosSelecionados.filter(plano => plano !== checkboxValue));
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();

        const profissional: IProfissional = {
            nome: nome,
            crm: crm,
            especialidade: especialidade,
            email: email,
            atendePorPlano: atendePorPlano,
            estaAtivo: true,
            imagem: imagem,
            telefone: telefone,
            senha: senha,
            planoSaude: planosSelecionados,
            endereco: {
                rua: rua,
                cep: cep,
                estado: estado,
                numero: numero,
                complemento: complemento
            }
        }

        await cadastrarDados({url: 'especialista', dados: profissional, token: usuario.token})
    }

    return(
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="Modal de cadastro do especialista"
            aria-describedby="Nesse modal terá os dados de cadastro de especialista"
        >
            <BoxCustomizado>
                <Titulo>Cadastre o especialista inserindo os dados abaixo:</Titulo>
                <Formulario onSubmit={handleSubmit}>
                    <CampoDigitacao
                        tipo="text"
                        label="Nome"
                        valor={nome}
                        placeholder="Digite seu nome completo"
                        onChange={setNome}
                    />
                    <CampoDigitacao
                        tipo="text"
                        label="Email"
                        valor={email}
                        placeholder="Insira seu endereço de email"
                        onChange={setEmail}
                    />
                    <CampoDigitacao
                        tipo="text"
                        label="Senha"
                        valor={senha}
                        placeholder="Digite sua senha"
                        onChange={setSenha}
                    />
                    <CampoDigitacao
                        tipo="text"
                        label="Repita a senha"
                        valor={confirmaSenha}
                        placeholder="Repita a senha anterior"
                        onChange={setConfirmaSenha}
                    />
                    <CampoDigitacao
                        tipo="text"
                        label="Especialidade"
                        valor={especialidade}
                        placeholder="Qual a sua especialidade?"
                        onChange={setEspecialidade}
                    />
                    <CampoDigitacao
                        tipo="text"
                        label="CRM"
                        valor={crm}
                        placeholder="Insira seu número de registro"
                        onChange={setCrm}
                    />
                    <CampoDigitacao
                        tipo="text"
                        label="Telefone"
                        valor={telefone}
                        placeholder="(DDD) XXXXX-XXXX"
                        onChange={setTelefone}
                    />
                    <CampoDigitacao
                        tipo="text"
                        label="Insira a URL da imagem"
                        valor={imagem}
                        placeholder="https://img.com/fotos/retrato-de-um-jovem-medico"
                        onChange={setImagem}
                    />
                    <CampoDigitacao
                        tipo="text"
                        label="Endereço"
                        valor={cep}
                        placeholder="Insira o CEP"
                        onChange={setCep}
                    />
                    
                    <Container>
                    <CampoDigitacao
                        tipo="text"
                        valor={rua}
                        placeholder="Rua"
                        onChange={setRua}
                    />
                        <CampoDigitacao
                            tipo="text"
                            valor={numero}
                            placeholder="Número"
                            onChange={setNumero}
                        />
                        <CampoDigitacao
                            tipo="text"
                            valor={complemento}
                            placeholder="Complemento"
                            onChange={setComplemento}
                        />
                        <CampoDigitacao
                            tipo="text"
                            valor={estado}
                            placeholder="Estado"
                            onChange={setEstado}
                        />
                    </Container>
                    {/* <SwitchCustomizado title="Atende por plano?" helperText="Não/Sim" value={atendePorPlano}/> */}
                    <ContainerSwitch>
                        <Subtitulo>Atende por plano?</Subtitulo>
                        <Switch
                            {...label} 
                            onChange={() =>{
                                !atendePorPlano ? setAtendePorPlano(true) : setAtendePorPlano(false)
                                {console.log(atendePorPlano)}
                            }}
                        />
                        <TextoSwitch>Não/Sim</TextoSwitch>
                    </ContainerSwitch>
                    {
                    atendePorPlano ?
                            <>
                                <Subtitulo>Selecione os planos:</Subtitulo>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox onChange={handleChange} value="Sulamerica" />} label="Sulamerica" />
                                    <FormControlLabel control={<Checkbox onChange={handleChange} value="Unimed" />} label="Unimed" />
                                    <FormControlLabel control={<Checkbox onChange={handleChange} value="Bradesco" />} label="Bradesco" />
                                    <FormControlLabel control={<Checkbox onChange={handleChange} value="Amil" />} label="Amil" />
                                    <FormControlLabel control={<Checkbox onChange={handleChange} value="Biosaúde" />} label="Biosaúde" />
                                    <FormControlLabel control={<Checkbox onChange={handleChange} value="Biovida" />} label="Biovida" />
                                    <FormControlLabel control={<Checkbox onChange={handleChange} value="Outro" />} label="Outro" />
                                </FormGroup>
                            </>
                            : ''}
                            <BotaoCustomizado>Cadastrar</BotaoCustomizado>
                </Formulario>
            </BoxCustomizado>
        </Modal>
    )
}

export default ModalCadastro;