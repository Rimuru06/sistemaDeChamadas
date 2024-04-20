import React from 'react';
import { Text, View, StyleSheet, Pressable, Alert } from 'react-native';
import { Card } from 'react-native-elements'
import { useParams, useNavigate } from 'react-router-native'
import turmaService from '../services/turma'
import { useState, useEffect } from 'react'
import AppBar from './AppBar';
import inscricaoService from '../services/inscricao'
import presencaService from '../services/presenca'
import aulaService from '../services/aula'



const styles = StyleSheet.create({
    center: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 25,
      borderRadius: 3,
      elevation: 3,
      backgroundColor: 'blue',
      marginTop: 50
    },
    text: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });

  const presencaAlert = (navigate,id_aluno) =>{
    console.log("presencaAlert chamada")
    
    Alert.alert('Sucesso!', 'Sua presença foi registrada com sucesso', [
    
    {text: 'OK', onPress: () => navigate(`/turmas/aluno/${id_aluno}`)},
  ])}

const onPressPresente = async (id_turma,id_aluno,navigate) => {

    const inscricao = await inscricaoService.getInscricao(id_turma,id_aluno)
    const id_inscricao = inscricao[0].id
    const body = { id_inscricao }

    const presenca = await presencaService.postPresenca(body)
    presencaAlert(navigate,id_aluno)
    navigate(`/turmas/aluno/${id_aluno}`)

}

const ApresentarTurma = props => {
    return (
        <View style={styles.center}>
            <Text style={styles.center}>{props.class}</Text>
        </View>
    )
}

const ApresentarProfessor = props => {
    return (
      <View style={styles.center}>
        <Text>Professor: {props.name}</Text>
      </View>
    );
};




const AlunoPresencaPage = () => {

  const PresencaButtonOrText = () => {

    if(!presencaAberta) {
      return (
        <View>
          <Text style={{marginTop: 20}}>
            A presença não está aberta para esta turma.
          </Text>
        </View>
      )
    }else {
      return (
        <Pressable style={styles.button} onPress={() => onPressPresente(id_turma,id_aluno,navigate)}>
              <Text style={styles.text}>{"Marcar presença"}</Text>
            </Pressable>
      )
    }
  
  }

  const id_turma = useParams().id
  const [ turma, setTurma ] = useState()
  const [ presencaAberta, setPresencaAberta ] = useState(false)
  const navigate = useNavigate()

  const id_aluno = window.localStorage.getItem('id_logged_user')


  useEffect(() => {
    async function fetchTurma() {
          const response = await turmaService.getTurmaPorId(id_turma);
          setTurma(response.data[0]);

          const res_aulas = await aulaService.getAulasDaTurma(id_turma)
          var status = 0
          if(res_aulas[0] !== undefined){
            status = res_aulas[0].status_code
           // console.log(status)
          }
          if(status === 1) {
            setPresencaAberta(true)
          }else {
            setPresencaAberta(false)
          }
          return;
    }
         
    fetchTurma()
  }
  , [presencaAberta]);

  var turmaName = ""
  var professor = ""

  if(turma !== undefined) {
    turmaName = turma.nome_disciplina;
    professor = turma.nome_professor;
  }

    return (
      <>
        <AppBar />
        <View style={[styles.center, {top: 50}]}>
          <Card style={styles.center}>
            <ApresentarTurma class={turmaName}></ApresentarTurma>
            <ApresentarProfessor name={professor} />
          </Card>
          <PresencaButtonOrText />
        </View>
      </>
    );
};

export default AlunoPresencaPage;


