import React, { Component } from 'react';
import ModalDialog from 'react-modal-dialog/lib/ModalDialog';
import ModalContainer from 'react-modal-dialog/lib/ModalContainer';
import { graphql } from 'react-apollo';
import Sidebar from 'react-sidebar';
import gql from 'graphql-tag';
import './App.css';
import User from './User';
import Loader from './Loader';

const mql = window.matchMedia(`(min-width: 768px)`); // eslint-disable-line no-undef

const query = gql`
  {
    refugees {
      first_name
      last_name
      image
      bio
      origin_country
      goals
      profile_color
      email
      id
      username
      phone
      amount_raised
    }
  }
`;
class App extends Component {
  constructor() {
    super();
    this.state = {
      userId: null,
      addedFunds: 0,
      showModal: false,
      refugees: [],
      loading: true,
      error: false,
      searchText: '',

      mql,
      docked: true,
      open: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openModal = this.openModal.bind(this);

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
  }
  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({ mql, docked: mql.matches });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: nextProps.data.loading,
      error: nextProps.data.error,
      refugees: nextProps.data.refugees,
    });
  }
  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }
  onSetOpen(open) {
    this.setState({ open });
  }
  mediaQueryChanged() {
    this.setState({
      mql,
      docked: this.state.mql.matches,
    });
  }
  toggleOpen(ev) {
    this.setState({ open: !this.state.open });
    if (ev) {
      ev.preventDefault();
    }
  }
  addFunds(id, amount) {
    const { refugees } = this.state;
    const index = refugees.findIndex(x => x.id === id);
    const fundedRefugee = Object.assign({}, refugees[index], {
      amount_raised: parseFloat(amount) + refugees[index].amount_raised,
    });
    this.setState({
      showModal: false,
      addedFunds: 0,
      refugees: [
        ...refugees.slice(0, index),
        fundedRefugee,
        ...refugees.slice(index + 1),
      ],
    });
  }
  openModal() {
    this.setState({ showModal: true });
  }
  handleClose() {
    this.setState({ showModal: false });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const {
      loading,
      error,
      refugees,
      showModal,
      addedFunds,
      searchText,
      docked,
      open,
    } = this.state;
    if (loading) return <Loader />;
    if (error) return <p>Error :(</p>;
    const filteredRefugees = refugees.filter(
      x => x.first_name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );

    const userId = this.state.userId || refugees[0].id;
    const user = refugees.find(x => x.id === userId);

    const sidebarContent = (
      <ul className="sidebar-nav">
        <li>
          <input
            name="searchText"
            placeholder="Search..."
            className="form-control"
            value={searchText || ''}
            type="text"
            onChange={this.handleChange}
          />
        </li>
        {filteredRefugees.map(r => (
          <li key={r.id} className="sidebar-brand">
            <a
              className={userId === r.id ? 'active' : ''}
              onClick={() => this.setState({ userId: r.id })}
            >
              {r.first_name}
            </a>
          </li>
        ))}
      </ul>
    );
    return (
      <div>
        <div>
          <Sidebar
            sidebar={sidebarContent}
            docked={docked}
            open={open}
            onSetOpen={this.onSetOpen}
          >
            <button
              onClick={this.toggleOpen}
              className="btn btn-lg ham-btn visible-xs"
            >
              &#9776;
            </button>
            <User openModal={this.openModal} user={user} />
            {showModal && (
              <ModalContainer onClose={this.handleClose}>
                <ModalDialog onClose={this.handleClose}>
                  <h3>Enter Amount</h3>
                  <br />
                  <input
                    className="form-control"
                    value={addedFunds || ''}
                    name="addedFunds"
                    placeholder="Amount"
                    type="number"
                    onChange={this.handleChange}
                  />
                  <br />
                  <center>
                    <button
                      onClick={this.addFunds.bind(this, userId, addedFunds)}
                      className="submit-btn"
                    >
                      SUBMIT
                    </button>
                  </center>
                </ModalDialog>
              </ModalContainer>
            )}
          </Sidebar>
        </div>
      </div>
    );
  }
}
export default graphql(query)(App);
