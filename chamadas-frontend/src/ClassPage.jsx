import { FlatList, View, StyleSheet, Text, Pressable, Dimensions } from 'react-native';
import { useParams } from 'react-router-native';
import AppBar from './AppBar';
import { useState, useEffect } from 'react'
import inscricaoService from '../services/inscricao'
import turmaService from '../services/turma'
import aulaService from '../services/aula'
import StudentCard from './AlunoCard'
import AbrirPresencaButton from './AbrirPresencaButton'

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
    ausenteButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        width: 65,
        height: 25,
        borderRadius: 5,
        marginRight: 5
    }
})

const getCurrentDate = () => {
 
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '/' + month + '/' + year;//format: d-m-y;
}

const ItemSeparator = () => <View style={styles.separator} />;

const ListHeader = ({ className, id_turma }) => {
    return (
        <View>
            <Text style={styles.classHeaderStyle}>{className}</Text>
            <Text style={styles.dateHeaderStyle}>{getCurrentDate()}</Text>
            <AbrirPresencaButton style={{justifyContent: 'center', alignItems: 'center', display: 'flex' }} id_turma={id_turma}/>
        </View>
    )
}


let ClassPage = () => {

    let id_turma = useParams().id;
    const [ turma, setTurma ] = useState()

    const [ alunos, setAlunos ] = useState([])


    useEffect(() => {
        async function fetchTurma() {
              const response = await turmaService.getTurmaPorId(id_turma);
              setTurma(response.data[0]);

              const res_alunos = await inscricaoService.getAlunosPorTurma(id_turma)
              setAlunos(res_alunos)
              //console.log(res_alunos)
            
             
        

            

              setAlunos(res_alunos.map((aluno) =>  {
                
                return { id_aluno: aluno.id_aluno, nome: aluno.nome, id_turma: aluno.id_turma, id_inscricao: aluno.id }

              }))

              return;
        }
             
        fetchTurma()
      }
      , []);
    
      var turmaName = ""
      var professor = ""
      var alunosArray = []
      
    
      if(turma !== undefined) {
        turmaName = turma.nome_disciplina;
        professor = turma.nome_professor;
      }

      if(alunos !== undefined) {
        alunosArray = alunos
      }

    return (
        <>
            <AppBar />
            <View style={styles.container}>
                <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                    <FlatList
                        ListHeaderComponent={<ListHeader className={turmaName} id_turma={id_turma} />}
                        data={alunosArray}
                        ItemSeparatorComponent={ItemSeparator}
                        renderItem={({ item }) => <StudentCard student={item}/>}
                    />
                </View>
            </View>
        </>
    );
}

export default ClassPage;