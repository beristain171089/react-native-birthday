import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { validateEmail } from '../utils/validations';
import firebase from '../utils/firebase';

export default function LoginForm(props) {

    const { changeForm } = props;

    const [formData, setFormData] = useState(defaultValue);
    const [formError, setFormError] = useState({});

    const login = () => {

        let erros = {};

        if (!formData.email || !formData.password) {

            if (!formData.email) {

                erros.email = true;
            };

            if (!formData.password) {

                erros.password = true;
            };

        } else if (!validateEmail(formData.email)) {

            erros.email = true;

        } else {

            firebase
                .auth()
                .signInWithEmailAndPassword(formData.email, formData.password)
                .catch(() => {

                    setFormError({
                        email: true,
                        password: true
                    });

                });
        };

        setFormError(erros);
    };

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    };

    return (
        <>
            <TextInput
                style={[styles.input, formError.email && styles.errorInput]}
                placeholder='Correo electronico'
                placeholderTextColor='#969696'
                onChange={(e) => onChange(e, 'email')}
            />
            <TextInput
                style={[styles.input, formError.password && styles.errorInput]}
                placeholder='Contraseña'
                placeholderTextColor='#969696'
                secureTextEntry={true}
                onChange={(e) => onChange(e, 'password')}
            />
            <TouchableOpacity onPress={login}>
                <Text style={styles.btnText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <View style={styles.register}>
                <TouchableOpacity onPress={changeForm}>
                    <Text style={styles.btnText}>Registrate</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

function defaultValue() {
    return {
        email: '',
        password: ''
    };
};

const styles = StyleSheet.create({
    btnText: {
        color: '#fff',
        fontSize: 18
    },
    input: {
        height: 50,
        color: '#fff',
        width: '80%',
        marginBottom: 25,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#1e3040'
    },
    errorInput: {
        borderColor: '#940c0c'
    },
    register: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10
    }
});
