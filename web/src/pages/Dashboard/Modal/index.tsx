import { Box, Modal } from "@mui/material";
import Titulo from "../../../components/Titulo";

const ModalCadastro = ({open, handleClose}: {open: boolean, handleClose: () => void}) => {
    return(
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="Modal de cadastro do especialista"
            aria-describedby="Nesse modal terá os dados de cadastro de especialista"
        >
            <Box>
                <Titulo>Cadastre o especialista inserindo os dados abaixo:</Titulo>
            </Box>
        </Modal>
    )
}

export default ModalCadastro;