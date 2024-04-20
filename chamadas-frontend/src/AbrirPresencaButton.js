import { View, StyleSheet, Text, Pressable, Dimensions } from 'react-native';
import { useState, useEffect } from 'react'
import aulaService from '../services/aula'

const styles = StyleSheet.create({
    abrirPresencaStyle: {
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'green',
        border: '1px solid green',
        width: 110,
        height: 35,
        borderRadius: 5,
        marginBottom: 20
    },
    fecharPresencaStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: 'red',
        border: '1px solid red',
        width: 110,
        height: 35,
        borderRadius: 5,
        marginBottom: 20
    },
    textStyle: {
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },

})



const AbrirPresencaButton = ({ id_turma }) => {

    const [ presencaAberta, setPresencaAberta ] = useState(false)
    
    const onPress = ({ setPresencaAberta }) => {
        setPresencaAberta(!presencaAberta)
    }

    useEffect(() => {
        async function abrirPresenca() {

                if(presencaAberta){
                    const body = { id_turma: id_turma, status_code: 1 }
                    const lanca_presenca = await aulaService.postAula(body)
                    //console.log(lanca_presenca)
                
                }

                if(!presencaAberta) {
                    const res_aulas = await aulaService.getAulasDaTurma(id_turma)
                    //console.log(res_aulas)
                    const id_ultimo = res_aulas[0].id
                    const body = { id_ultimo: id_ultimo }

                    const update = await aulaService.fecharTurma(body)
                    //console.log(update)
                }
             
        }
             
        abrirPresenca()
      }
      , [presencaAberta]);
    
    
    return (
        <View style={{justifyContent:'center', flexDirection:'row', alignItems:'center'}}>
            <Pressable onPress={() => onPress({setPresencaAberta})} style={!presencaAberta ? styles.abrirPresencaStyle : styles.fecharPresencaStyle}>
            {!presencaAberta ? <Text style={styles.textStyle}>Abrir Presença</Text> : <Text style={styles.textStyle}>Fechar Presença</Text>}
            </Pressable>
        </View>
    )
}

export default AbrirPresencaButton