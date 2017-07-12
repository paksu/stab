import React, { Component } from 'react';
import { Container, Jumbotron } from 'reactstrap';
import Thread from './Thread';
import Filters from './Filters';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterPublic: false,
      filterYear: undefined,
      participantFilters: {},
    };
    this.handleParticipantFiltersChanged = this.handleParticipantFiltersChanged.bind(this);
    this.handlePublicFilterChange = this.handlePublicFilterChange.bind(this);
    this.isCollapsed = this.isCollapsed.bind(this);
  }

  handleParticipantFiltersChanged(country) {
    this.setState((prevState) => {
      let { participantFilters } = { ...prevState };
      participantFilters[country] = !participantFilters[country];
      return { participantFilters };
    })
  }

  handlePublicFilterChange() {
    this.setState((prevState) => {
      return {
        filterPublic: !prevState.filterPublic
      }
    })
  }

  isCollapsed(filterOutPublic, participants, filters) {
    const hasAnyFilters = Object.values(filters).some(a => a);
    return (filterOutPublic && participants.length === 7) || (hasAnyFilters && !participants.some(participant => filters[participant]))
  }

  render() {
    return (
      <Container style={{paddingTop: "1em"}}>
        <Jumbotron>
          <h2 className="display-3">#apinasaari diplomacy</h2>
          <p className="lead">Filter, read, laugh, link. You're welcome</p>
          <hr className="my-2" />
        </Jumbotron>
        <Filters onParticipantFiltersChange={this.handleParticipantFiltersChanged} onPublicFilterChange={this.handlePublicFilterChange} participantFilters={this.state.filterParticipants} />
        {this.props.threads.map((thread) => {
          return <Thread {...thread} key={thread.id} collapsed={this.isCollapsed(this.state.filterPublic, thread.participants, this.state.participantFilters)} />
        })}
      </Container>
    );
  }
}

export default App;
