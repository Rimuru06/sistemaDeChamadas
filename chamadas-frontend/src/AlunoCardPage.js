import { useParams } from 'react-router-native'
import AppBar from './AppBar'
import { useState, useEffect } from 'react'
import presencaService from '../services/presenca'
import turmaService from '../services/turma'
import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Card } from 'react-native-elements'
import pessoaService from '../services/pessoa'

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


const AlunoCardPage = () => {

    const MostraData = ({ data_ }) => {
        if(historico.length !== 0){
        return (
              <View>
                  <Text>{data_}</Text>
              </View>
        )}
        else return null
      }
      const ApresentarTurma = props => {
        return (
            <View style={styles.center}>
                <Text style={styles.center}>{props.class}</Text>
            </View>
        )
    }
    
    const ApresentarAluno = props => {
        return (
            <View style={styles.center}>
                <Text style={styles.center}>Aluno(a): {props.aluno}</Text>
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
    
    const ApresentarFrequencia = ({ historico }) => {
        let datasArray = []
        
        if(historico !== undefined){
          const datas = historico.map((pres) => {
              const data_ = new Date(pres.data)
              const dia = data_.getDate()
              const mes = data_.getMonth() + 1
              const ano = data_.getFullYear()
              return `${dia}/${mes}/${ano}`
          
          })
          for(let i = 0; i < datas.length; i++){
            if(!datasArray.includes(datas[i])) {
              datasArray.push(datas[i])
            }
          }
        }
          return (
              <View>
                  <Text>O(a) aluno(a) este presente nos seguintes dias:</Text>
                  <FlatList
                          data={(Array.isArray(datasArray) ? datasArray : [])}
                          renderItem={({ item }) => <MostraData data_={item}/>}
                      />
              </View>
          );
      };
    

    const id_inscricao = useParams().id_inscricao
    const id_turma = useParams().id_turma
    const nome_aluno = useParams().nome_aluno
    
    const [ historico, setHistorico ] = useState([])
    const [ turma, setTurma ] = useState()

    useEffect(() => {
        async function fetchPresencasAndTurma() {
    
            const res_historico = await presencaService.getByInscricao(id_inscricao)
            
            setHistorico(res_historico)

            const response = await turmaService.getTurmaPorId(id_turma);

            setTurma(response.data[0]);

        
            return;
        }
        fetchPresencasAndTurma()
        
    }, [])

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
              <ApresentarAluno aluno={nome_aluno} />
            </Card>
            <Card>
              <ApresentarFrequencia historico={historico}></ApresentarFrequencia>
            </Card>
          </View>
        </>
      );

}

export default AlunoCardPage