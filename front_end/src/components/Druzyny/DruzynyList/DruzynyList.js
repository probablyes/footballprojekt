import React from 'react';
// import axios from 'axios';
import { Redirect } from 'react-router'
import '../../entityTable.css';
import '../../entityForm.css';

import ModalConfirmation from '../../Modal/ModalConfirmation/ModalConfirmation';
import { getRecordList, deleteRecordCall } from '../../../apiCalls/druzynyApiCalls';
import formMode from '../../formMode';

class DruzynyList extends React.Component {
    constructor(props) {
        super(props);
        // let { action } = useParams();
        this.state = {
            druzyny: [],
            isFetchingUsers: false,
            showDeleteModal: false,
            recordToDeleteId: null,
            redirect: false,
            confirmation: 'Czy na pewno chcesz usunąć rekord?'
        }
        console.log(`props: ${JSON.stringify(props)}`);
    }

    componentDidMount() {
        this.fetchUserList();
        this.setState({
            isFetchingUsers: true
        });
    }

    onSiteChanged(e) {
        this.setState({
            site: e.currentTarget.value
        });
    }

    render() {
        let redirectToForm = null;
        console.log('t', this.state);
        if (this.state.redirect === true) {
            redirectToForm = <Redirect to="/druzyny/form" />
        }

        let deleteConfirmModalWindow = null;
        console.log('state modal', this.state.showDeleteModal);
        if(this.state.showDeleteModal) {
            deleteConfirmModalWindow = (
                <ModalConfirmation
                    confirmHandler={this.handleDeleteConfirm}
                    rejectHandler={this.handleDeleteCancel}
                    header="Potwierdź usunięcie">
                    <div>
                        <h2>{this.state.confirmation}</h2>
                    </div>
                </ModalConfirmation>
            );
        }

        const druzynyRows = this.state.druzyny.map((druzyna, index) => {
            return (
                <tr>
                    {redirectToForm}
                    {deleteConfirmModalWindow}
                    <td>{druzyna.Id}</td>
                    <td>{druzyna.nazwa}</td>
                    <td><input type="radio" name="site_name" value={druzyna.Id}/>
                                {/*value={result.SITE_NAME}*/}
                                {/*onChange={this.onSiteChanged} />*/}
                    </td>
                </tr>
            )
        });
        return (
            <>
                <h2>Lista drużyn:</h2>
                <table Id="table-generic" align="center">
                    <thead>
                        <tr>
                            <th id="record_id">Id</th>
                            <th>Nazwa</th>
                            <th>Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {druzynyRows}
                    </tbody>
                    <tfoot>
                        <tr className="table-footer">
                            <td colSpan="5">
                                <button onClick={this.handleShowNewForm}>Nowa drużyna</button>
                                <button onClick={this.handleShowDetails}>Szczegóły</button>
                                <button onClick={this.handleShowEditForm}>Edytuj</button>
                                <button onClick={this.handleDelete2}>Usuń</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </>
        );
    }

    handleShowEditForm = () => {
        window.sessionStorage.userFormMode = formMode.EDIT;
        window.sessionStorage.recordId = document.querySelector('input[name="site_name"]:checked').value;
        this.setState({
            redirect: true
        });
    }

    handleShowDetails = () => {
        window.sessionStorage.userFormMode = formMode.DETAILS;
        window.sessionStorage.recordId = document.querySelector('input[name="site_name"]:checked').value;
        this.setState({
            redirect: true
        });
    }

    handleShowNewForm = () => {
        console.log(`handleShowNewForm()`);
        window.sessionStorage.userFormMode = formMode.NEW;
        window.sessionStorage.druzynaId = null;
        this.setState({
            redirect: true
        });
    }

    handleDelete2 = () => {
        console.log('test checked:', document.querySelector('input[name="site_name"]:checked').value);
        this.setState({
            showDeleteModal: true,
            recordToDeleteId: document.querySelector('input[name="site_name"]:checked').value
        });
        console.log('state modal', this.state.showDeleteModal);

    }

    handleDeleteConfirm = () => {
        deleteRecordCall(this.state.recordToDeleteId)
            .then(res => {
                this.setState({
                    showDeleteModal: false,
                    recordToDeleteId: null
                }, this.fetchUserList);
            })
            .catch(err => {
                this.setState({
                    confirmation: err.message
                });
            });
    }

    handleDeleteCancel = () => {
        this.setState({
            showDeleteModal: false,
            userToDelete: null
        });
    }

    fetchUserList = () => {
        getRecordList()
            .then(response => {
                console.log(response);
                console.log(response.data);
                this.setState({
                    druzyny: response.data,
                    isFetchingUsers: false,
                    showDeleteModal: false,
                    userIdToDelete: null,
                    redirect: false
                });
            })
            .catch(err => {
                this.setState({
                    isFetchingUsers: true
                });
            })
            .finally(() => {
                console.log('finally');
            });
    }
}

export default DruzynyList;