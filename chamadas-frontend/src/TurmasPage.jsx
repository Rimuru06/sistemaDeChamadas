import React from 'react';
import { useState, useEffect } from 'react'
import { View, Text, Pressable, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useNavigate, useParams } from 'react-router-native';
import turmasService from '../services/turma';
import AppBar from './AppBar';


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
    turmasHeaderStyle: {
        marginTop: 20,
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 17,
    },
    dateStyle: {
        paddingRight: 5,
        marginTop: 5,
        textAlign: 'right',
    },
    roleStyle: {
        paddingLeft: 5,
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: windowWidth - 20,
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonPresenca: {
        backgroundColor: '#836FFF', // Roxo claro
    },
    buttonHistorico: {
        backgroundColor: '#00FF7F', // Verde claro
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});




const onPressButton = (action, turma, navigate, role) => {
    if (role === 'aluno') {
        if (action === 'Presença') {
            const turmaUrl = `/aluno/${encodeURIComponent(turma.id)}`;
            navigate(turmaUrl);
        } else {
            navigate(`/historicoaluno/${turma.id}`);
        }
    }
    if (role === 'professor') {
        if (action === 'Presença') {
            const turmaUrl = `/turma/${encodeURIComponent(turma.id)}`;
            navigate(turmaUrl);
        } else {
            navigate(`/professorhistorico/${turma.id}`);
        }
    }
};



const TurmaCard = ({ turma, navigate, role }) => {
    const turmaHeader = turma.codigo + ' - ' + turma.nome;

    return (
        <View>
            <Pressable onPress={() => onPressButton('Turma', turma, navigate, role)}>
                <View style={styles.flexCard}>
                    <Text style={styles.nameStyle}>{turmaHeader}</Text>
                </View>
            </Pressable>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={[styles.button, styles.buttonPresenca]}
                    onPress={() => onPressButton('Presença', turma, navigate, role)}
                >
                    <Text style={styles.buttonText}>Presença</Text>
                </Pressable>
                <Pressable
                    style={[styles.button, styles.buttonHistorico]}
                    onPress={() => onPressButton('Histórico', turma, navigate, role)}
                >
                    <Text style={styles.buttonText}>Histórico</Text>
                </Pressable>
            </View>
        </View>
    );
};



const getCurrentDate = () => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    return date + '/' + month + '/' + year;
};

const ItemSeparator = () => <View style={styles.separator} />;

const TurmasHeader = () => {
    return (
        <View>
            <Text style={styles.turmasHeaderStyle}>Minhas turmas</Text>
        </View>
    );
};

const TurmasPage = () => {
    const navigate = useNavigate();
    const role = useParams().role;
    const roleHeader = role.charAt(0).toUpperCase() + role.slice(1);
    const id = useParams().id;
    const [ turmas, setTurmas ] = useState([]);
    useEffect(() => {
        async function fetchTurmas() {
            if(role === 'professor') {
                const response = await turmasService.getTurmasProfessor(id);
                setTurmas(response);
                return;
            }
            else if(role === 'aluno') {
                const response = await turmasService.getTurmasAluno(id);
                setTurmas(response);
                return;
            }
            
        }
        fetchTurmas()
        
    }, [])
    

    return (
        <>
            <AppBar />
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.roleStyle}>{roleHeader}</Text>
                    <Text style={styles.dateStyle}>{getCurrentDate()}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <FlatList
                        ListHeaderComponent={<TurmasHeader />}
                        data={turmas}
                        ItemSeparatorComponent={ItemSeparator}
                        renderItem={({ item }) => <TurmaCard role={role} turma={item} navigate={navigate} />}
                    />
                </View>
            </View>
        </>
    );
};

export default TurmasPage;