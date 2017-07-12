import React, { Component } from 'react';
import { Colors, Countries } from './constants'
import { CardBlock, Card } from 'reactstrap';

class Filters extends Component {
  constructor(props) {
    super(props);
    this.toggleParticipantFilter = this.toggleParticipantFilter.bind(this);
    this.togglePublicFilter = this.togglePublicFilter.bind(this);
  }

  toggleParticipantFilter(e) {
    this.props.onParticipantFiltersChange(e.target.value)
  }

  togglePublicFilter(e) {
    this.props.onPublicFilterChange()
  }

  render() {
    return (
      <Card style={{marginBottom: "1em"}}>
        <CardBlock>
          <h6>Filter thread by participant</h6>
          {Countries.map(country => {
            return (
              <div className="form-check form-check-inline" key={country}>
                <label className="form-check-label">
                  <input className="form-check-input" type="checkbox" id={country} value={country} onChange={this.toggleParticipantFilter}/>
                  <span style={{ display: "inline-block", width: "1em", height: "1em", marginRight: "0.2em", background: Colors[country] }}> </span>
                  {country}
                </label>
              </div>
            )
          })}
          <div className="form-check form-check">
            <label className="form-check-label">
              <input className="form-check-input" type="checkbox" id="hide-public-messages" onChange={this.togglePublicFilter} />
              {" "} Collapse public messages
            </label>
          </div>
        </CardBlock>
      </Card>
    )
  }
}
export default Filters;
