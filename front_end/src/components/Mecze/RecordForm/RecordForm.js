import React from 'react';
// import axios from 'axios';
import {
    Link
} from "react-router-dom";
import { Redirect } from 'react-router'

import formMode from '../../formMode';
import ModalMessage from '../../Modal/ModalMessage/ModalMessage';

import { getRecordDetailsCall, createRecordServerCall, updateRecordCall } from '../../../apiCalls/meczApiCalls';
import { getRecordList as getDruzynaList} from '../../../apiCalls/druzynyApiCalls';

import '../../entityForm.css';

class RecordForm extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            druzynaId: null,
            record: {
                wynik: '',
                data: null,
                Druzyna_Id: '',
                Druzyna_2_Id: ''
            },
            errors: {
                wynik: '',
                data: null,
                Druzyna_Id: '',
                Druzyna_2_Id: ''
            },
            formMode: formMode.NEW,
            modalMessage: null,
            redirect: false,
            druzynaExport: [],
            selecedtValue: '',
            selecedtValue2: ''
        }
    }

    componentDidMount() {
        const currentFormMode = window.sessionStorage.userFormMode;
        const druzynaId = window.sessionStorage.recordId;
        console.log('druzynaId', druzynaId);
        console.log(`UserForm.componentDidMount() formMode: ${currentFormMode} userId: ${druzynaId}`);
        this.setState({
            druzynaId: druzynaId,
            record: {
                wynik: '',
                data: null,
                Druzyna_Id: '',
                Druzyna_2_Id: '',
            },
            errors: {
                wynik: '',
                data: null,
                Druzyna_Id: '',
                Druzyna_2_Id: ''
            },
            formMode: currentFormMode,
            modalMessage: null,
            redirect: false,
            druzynaExport: [],
            selecedtValue: '',
            selecedtValue2: ''
        })
        this.fetchRecordDetails2();
        if (currentFormMode === formMode.EDIT || currentFormMode === formMode.DETAILS) {
            this.fetchRecordDetails(druzynaId);
        }

    }

    render() {
        let redirect = null;
        if (this.state.redirect) {
            redirect = (<Redirect to="/mecze" />);
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
            pageTitle = "Nowy rekord";
        } else if (currentFormMode === formMode.EDIT) {
            pageTitle = "Edytuj rekord";
        } else if (currentFormMode === formMode.DETAILS) {
            pageTitle = "Szczegóły rekordu";
        }

        const readonly = currentFormMode === formMode.DETAILS;
        const record = { ...this.state.record };
        //record.wynik = record.wynik.substring(0,10);
        console.log('test2', this.state.record);
        let formattedDate = record.data;
        formattedDate = formattedDate + " ";
        formattedDate = formattedDate.substring(0,10);
        console.log(formattedDate);

        let druzyna2errors = null;
        if (this.state.errors.nazwa && this.state.errors.nazwa.length > 0) {
            druzyna2errors = this.state.errors.nazwa.map((err, index) => {
                return (<span className="fieldError" key={`nazwaErrors${index}`}>{err}</span>);
            });
        }

        let druzyna1errors = null;
        if (this.state.errors.Druzyna_Id && this.state.errors.Druzyna_Id.length > 0) {
            druzyna1errors = this.state.errors.Druzyna_Id.map((err, index) => {
                return (<span className="fieldError" key={`lastNameErr_${index}`}>{err}</span>);
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
                    <input type="hidden" name="user_id" value={record.id || ''}></input>

                    {/*<input id="Druzyna_Id" name="Druzyna_Id" type="text" readOnly={readonly}*/}
                    {/*       value={record.Druzyna_Id || ''} onChange={this.handleFieldChange} placeholder={"drużyna 1"}></input>*/}
                    {/*{druzyna1errors}*/}
                    {/*<input id="Druzyna_2_Id" name="Druzyna_2_Id" type="text" readOnly={readonly}*/}
                    {/*       value={record.Druzyna_2_Id || ''} onChange={this.handleFieldChange} placeholder={"drużyna 2"}></input>*/}
                    {/*{druzyna2errors}*/}
                    <input id="wynik" name="wynik" type="text" readOnly={readonly}
                           value={record.wynik || ''} onChange={this.handleFieldChange} placeholder={"wynik"}></input>
                    {druzyna2errors}
                    <input id="data" name="data" type="date" readOnly={readonly}
                           value={formattedDate || ''} onChange={this.handleFieldChange} placeholder={"data"}></input>
                    {druzyna2errors}

                    <select value={record.Druzyna_Id} onChange={this.updateSelectedValue}>
                    {this.state.druzynaExport.map(obj => (
                        <option value={obj}>{obj}</option>
                    ))}
                    </select>
                    {druzyna2errors}

                    <select value={record.Druzyna_2_Id} onChange={this.updateSelectedValue2}>
                        {this.state.druzynaExport.map(obj => (
                            <option value={obj}>{obj}</option>
                        ))}
                    </select>
                    {druzyna2errors}

                    <div className="form-actions-container">

                        {saveBtn}
                        <Link to="/mecze" className="action-btn">Anuluj</Link>
                    </div>
                    {errorSummary}
                </form >
            </div >
        );
    }

    updateSelectedValue = (event) => {
        // this.setState({
        //     selecedtValue: event.target.value
        // });
        // this.setState({
        //     record.Druzyna_Id: event.target.value
        // })
        this.state.record.Druzyna_Id = event.target.value;
        console.log('e', this.state.record.Druzyna_Id);
    }

    updateSelectedValue2 = (event) => {
        // this.setState({
        //     selecedtValue2: event.target.value
        // });
        this.state.record.Druzyna_2_Id = event.target.value;

    }

    handleSave = (event) => {
        const currentFormMode = this.state.formMode;
        const record = this.state.record;
        event.preventDefault();
        // if (!formValid) {
        //     return false;
        // }
        let promise = null;
        let confirmMessage = null;
        if (currentFormMode === formMode.NEW) {
            promise = createRecordServerCall(record);
            confirmMessage = "Pomyślnie dodano";
        } else if (currentFormMode === formMode.EDIT) {
            console.log('robię update', record);
            promise = updateRecordCall(record);
            confirmMessage = "Pomyślnie zaktualizowano";
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
        const record = { ...this.state.record }
        record[fieldName] = newVal;
        const errArray = this.validateField(newVal, fieldName);
        const errors = { ...this.state.errors };
        errors[fieldName] = errArray;
        this.setState({
            errors: errors,
            record: record
        });
    }

    validateField(value, fieldName) {
        const errArray = [];
        if (fieldName === 'nazwa') {
            if (!value || value.trim() === '') {
                errArray.push('Pole "Nazwa" jest wymagane');
            } else if (value.length < 2) {
                errArray.push('Pole "Imię" musi zawierać przynajmniej 2 znaki');
            }
        }
        if (fieldName === 'Druzyna_Id') {
            if (!value || value.trim() === '') {
                errArray.push('Pole jest wymagane');
            } else if (value.length < 1) {
                errArray.push('Pole musi zawierać przynajmniej 1 znak');
            }
        }

        // console.log(`validateField() value: ${value} fieldName: ${fieldName} errors: ${JSON.stringify(errors)} `);
        return errArray;
    }

    validateForm() {
        let valid = true;
        const record = this.state.record;
        const errors = { ...this.state.errors };
        for (let field in record) {
            const fieldErrors = this.validateField(record[field], field);
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
            if(errors[field] != null) {
                if (errors[field].length > 0) {
                    console.log(`has errors for field: ${field}`);
                    return false;
                }
            }
        }
        return true;
    }

    fetchRecordDetails = (record) => {
        getRecordDetailsCall(record)
            .then(result => {
                console.log(`fetchDetails() result: ${JSON.stringify(result.data)}`);
                this.setState({
                    record: result.data[0]
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    fetchRecordDetails2 = () => {
        getDruzynaList()
            .then(result => {
                console.log(`fetchDetails() result: ${JSON.stringify(result.data)}`);
                //console.log('tupeof data', typeof Object.entries(result.data));
                var arr = [];
                for (var i = 0; i < result.data.length; i++) {
                    arr.push(result.data[i].nazwa);
                }
                console.log('arr', arr);
                this.setState({
                    druzynaExport: arr
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

export default RecordForm;