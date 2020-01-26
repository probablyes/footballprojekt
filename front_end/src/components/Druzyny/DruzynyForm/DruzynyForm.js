import React from 'react';
// import axios from 'axios';
import {
    Link
} from "react-router-dom";
import { Redirect } from 'react-router'

import formMode from '../../formMode';
import ModalMessage from '../../Modal/ModalMessage/ModalMessage';

import { getRecordDetailsCall, createRecordServerCall, updateRecordCall } from '../../../apiCalls/druzynyApiCalls';
import '../../entityForm.css';

class DruzynyForm extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            druzynaId: null,
            druzyna: {
                nazwa: ''
            },
            errors: {
                nazwa: []
            },
            formMode: formMode.NEW,
            modalMessage: null,
            redirect: false
        }
    }

    componentDidMount() {
        const currentFormMode = window.sessionStorage.userFormMode;
        const druzynaId = window.sessionStorage.recordId;
        console.log(`UserForm.componentDidMount() formMode: ${currentFormMode} userId: ${druzynaId}`);
        this.setState({
            druzynaId: druzynaId,
            druzyna: {
                nazwa: ''
            },
            errors: {
                nazwa: []
            },
            formMode: currentFormMode,
            modalMessage: null,
            redirect: false
        })
        if (currentFormMode === formMode.EDIT || currentFormMode === formMode.DETAILS) {
            this.fetchRecordDetails(druzynaId);
        }

    }

    render() {
        let redirect = null;
        if (this.state.redirect) {
            redirect = (<Redirect to="/druzyny" />);
        }

        let modalMessageWindow = null;
        if (this.state.modalMessage && this.state.modalMessage !== '') {
            modalMessageWindow = (
                <ModalMessage closeHandler={this.handleCloseModalMessage} header="Potwierdzenie">
                    <span>{this.state.modalMessage}</span>
                </ModalMessage>
            );
        }

        const currentFormMode = this.state.formMode;
        let pageTitle = null;
        if (currentFormMode === formMode.NEW) {
            pageTitle = "Nowa drużyna";
        } else if (currentFormMode === formMode.EDIT) {
            pageTitle = "Edytuj drużynę";
        } else if (currentFormMode === formMode.DETAILS) {
            pageTitle = "Szczegóły drużyny";
        }

        const readonly = currentFormMode === formMode.DETAILS;
        const druzyna = { ...this.state.druzyna };

        let nazwaErrors = null;
        if (this.state.errors.nazwa && this.state.errors.nazwa.length > 0) {
            nazwaErrors = this.state.errors.nazwa.map((err, index) => {
                return (<span className="fieldError" key={`nazwaErrors${index}`}>{err}</span>);
            });
        }

        let errorSummary = null;
        if (!this.isFormValid()) {
            errorSummary = (<span className="errorSummary">Formularz zawiera błędy</span>);
        }

        let saveBtn = null;
        if (currentFormMode === formMode.NEW || currentFormMode === formMode.EDIT) {
            saveBtn = (<button className="action-btn" onClick={this.handleSave}>Zapisz</button>)
        }
        console.log(`UserForm.render() formMode: ${currentFormMode} readonly: ${readonly}`);
        return (
            <div className="form-container">
                {redirect}
                {modalMessageWindow}
                <h2> {pageTitle}</h2>
                <form>
                    <input type="hidden" name="user_id" value={druzyna.id || ''}></input>
                    <input id="nazwa" name="nazwa" type="text" readOnly={readonly}
                           value={druzyna.nazwa || ''} onChange={this.handleFieldChange} placeholder={"imie"}></input>
                    {nazwaErrors}
                    <div className="form-actions-container">
                        {saveBtn}
                        <Link to="/druzyny" className="action-btn">Anuluj</Link>
                    </div>
                    {errorSummary}
                </form >
            </div >
        );
    }

    handleSave = (event) => {
        const currentFormMode = this.state.formMode;
        const druzyna = this.state.druzyna;
        const formValid = this.validateForm();
        event.preventDefault();
        if (!formValid) {
            return false;
        }
        let promise = null;
        let confirmMessage = null;
        if (currentFormMode === formMode.NEW) {
            promise = createRecordServerCall(druzyna);
            confirmMessage = "Dodano";
        } else if (currentFormMode === formMode.EDIT) {
            promise = updateRecordCall(druzyna);
            confirmMessage = "Zaktualizowano";
        }
        promise.then(res => {
            this.setState({
                modalMessage: confirmMessage
            });
        })
            .catch(err => {
                console.log(err);
            });
        return false;
    }

    handleFieldChange = (event) => {
        const fieldName = event.target.name;
        const newVal = event.target.value;
        console.log(`handleFieldChange() field: ${fieldName} value: ${newVal}`);
        const druzyna = { ...this.state.druzyna }
        druzyna[fieldName] = newVal;
        const errArray = this.validateField(newVal, fieldName);
        const errors = { ...this.state.errors };
        errors[fieldName] = errArray;
        this.setState({
            errors: errors,
            druzyna: druzyna
        });
    }

    validateField(value, fieldName) {
        const errArray = [];
        if (fieldName === 'nazwa') {
            if (!value || value.trim() === '') {
                errArray.push('Pole "Nazwa" jest wymagane');
            } else if (value.length < 3) {
                errArray.push('Pole "Nazwa" musi zawierać przynajmniej 2 znaki');
            }
        }
        return errArray;
    }

    validateForm() {
        let valid = true;
        const druzyna = this.state.druzyna;
        const errors = { ...this.state.errors };
        for (let field in druzyna) {
            const fieldErrors = this.validateField(druzyna[field], field);
            errors[field] = fieldErrors;
            if (fieldErrors.length > 0) {
                valid = false;
            }
        }
        this.setState({
            errors: errors
        })
        return valid;
    }

    isFormValid() {
        const errors = this.state.errors;
        for (let field in errors) {
            if (errors[field].length > 0) {
                return false;
            }
        }
        return true;
    }

    fetchRecordDetails = (druzyna) => {
        getRecordDetailsCall(druzyna)
            .then(result => {
                this.setState({
                    druzyna: result.data[0]
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleCloseModalMessage = (event) => {
        this.setState({
            modalMessage: null,
            redirect: true
        });
    }
}

export default DruzynyForm;