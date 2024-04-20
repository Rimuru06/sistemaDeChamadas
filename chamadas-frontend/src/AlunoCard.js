import presencaService from '../services/presenca'
import inscricaoService from '../services/inscricao'
import { View, StyleSheet, Text, Pressable, Dimensions } from 'react-native';
import { useState } from 'react'
import { useNavigate } from 'react-router-native'

const windowWidth = Dimensions.get('screen').width;


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
    },
    separator: {
        marginVertical: 5,
    },
    flexCard: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 50,
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth - 20,
        borderStyle: 'solid',
        borderColor: 'lightgrey',
        borderWidth: StyleSheet.hairlineWidth, 
        borderRadius: 5, 
    },
    nameStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 13,
    },
    porcentNeg: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontStyle: 'italic',
        color: 'red',
    },
    porcentPos: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontStyle: 'italic',
        color: 'green',
    },
    classHeaderStyle: {
        marginTop: 20,
        marginBottom: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        //fontWeight: 'bold',
        fontSize: 17
    },
    dateHeaderStyle: {
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        //fontWeight: 'bold'
    },
    presenteDarButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        border: '1px solid blue',
        width: 65,
        height: 25,
        borderRadius: 5,
    },
    textPresenteDarButton: {
        color: 'white'
    },
    presencaDadaButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        border: '1px solid blue',
        width: 65,
        height: 25,
        borderRadius: 5,
    },
    textPresencaDadaButton: {
        color: 'blue'
    },
    ausenteDarButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        width: 65,
        height: 25,
        borderRadius: 5,
        marginRight: 5
    },
    ausenciaDadaButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        border: '1px solid red',
        width: 65,
        height: 25,
        borderRadius: 5,
    },
    textAusenteDadaButton: {
        color: 'red'
    },
    textAusenteDarButton: {
        color: 'white'
    },
})

let onPressCard = ({ student,navigate }) => {
    navigate(`/alunohistorico/${student.nome}/${student.id_turma}/${student.id_inscricao}`)
    //console.log(JSON.stringify({student}));
}

let onPressPresente= async ({ student, setPresencaDada, setAusenciaDada }) => {


    const inscricao = await inscricaoService.getInscricao(student.id_turma,student.id_aluno)
    const id_inscricao = inscricao[0].id
    const body = { id_inscricao }
    const presenca = await presencaService.postPresenca(body)

    setPresencaDada("sim")
    setAusenciaDada("não")
    
}

let onPressAusente= async ({ student, setPresencaDada, setAusenciaDada }) => {

    const id_inscricao = await inscricaoService.getInscricao(student.id_turma,student.id_aluno)

    if(id_inscricao !== undefined){
        const deletion = await presencaService.deletePresenca(id_inscricao[0].id)
    }

    setPresencaDada("não")
    setAusenciaDada("sim")

}

const StudentCard = ({ student }) => {

    const navigate = useNavigate()
    const [ presencaDada, setPresencaDada ] = useState("não")
    const [ ausenciaDada, setAusenciaDada ] = useState("não")
    //console.log(student)

    return (

        <Pressable onPress={() => onPressCard({student,navigate})}>
            <View style={styles.flexCard}>
                <Text style={styles.nameStyle}>{student.nome}</Text>
                <Pressable onPress={() => onPressPresente({student, setPresencaDada, setAusenciaDada})} style={presencaDada==="não" ? styles.presenteDarButton : styles.presencaDadaButton}>
                    <Text style={presencaDada==="não" ? styles.textPresenteDarButton : styles.textPresencaDadaButton}>Presente</Text>
                </Pressable>
                <Pressable onPress={()=> onPressAusente({student, setPresencaDada, setAusenciaDada})} style={ausenciaDada === "não" ? styles.ausenteDarButton : styles.ausenciaDadaButton}>
                    <Text style={ausenciaDada === "não" ? styles.textAusenteDarButton : styles.textAusenteDadaButton }>Ausente</Text>
                </Pressable>
            </View>
        </Pressable>
    )
}

export default StudentCard