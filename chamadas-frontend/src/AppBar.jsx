import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
    appBarText: {
        color: 'white',
    },
    container: {
        paddingTop: 20,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'blue',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

const SignedInAppBar = () => {

    var cpf_user = ""
    var role_user = ""
    var id_user = ""

    try{
        cpf_user = window.localStorage.getItem('cpf_logged_user')
        role_user = window.localStorage.getItem('role_logged_user')
        id_user = window.localStorage.getItem('id_logged_user')
    }catch {
        
    }

    const [selectedCPF, setSelectedCPF] = useState('');

    /* Fetch the CPF data from the database
    useEffect(() => {
        const fetchCPF = async () => {
            // Replace the following line with your actual logic to fetch the unique CPF
            // For simplicity, let's assume yourDatabaseFetchFunction returns the single CPF
            const fetchedCPF = await yourDatabaseFetchFunction();
            setSelectedCPF(fetchedCPF);
        };

        fetchCPF();
    }, []);*/

    const turmas_link = `/turmas/${role_user}/${id_user}`

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <Text style={[styles.appBarText, { color: 'white' }]}>{cpf_user}</Text>
                <Link to={turmas_link}>
                    <Text style={styles.appBarText}>Turmas</Text>
                </Link>
                <Link to="/login">
                    <Text style={styles.appBarText}>Sair</Text>
                </Link>
            </View>
        </SafeAreaView>
    );
};

const AppBar = () => {
    return <SignedInAppBar />;
};

export default AppBar;
