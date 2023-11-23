import FormattedDate from "./formatted-date";

describe('<FormattedDate date=.../>', () => {
  it('should render and display date in expected format', () => {
    cy.mount(<FormattedDate date={new Date(2023, 10, 23)}></FormattedDate>);
    cy.get('time').should('contain', 'Nov 23, 2023');
  })
});

export { }
