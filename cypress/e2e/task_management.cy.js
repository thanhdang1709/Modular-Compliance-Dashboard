describe('Task Management', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should display the task list', () => {
      cy.contains('Tasks');
      cy.get('table').should('exist');
    });
  
    it('should add a new task', () => {
      cy.contains('Add New').click();
      cy.get('#title').type('E2E Test Task');
      cy.get('#dueDate').type('2023-12-31');
      cy.get('#assignedPerson').type('E2E Tester');
      cy.contains('Add Task').click();
      cy.contains('E2E Test Task').should('be.visible');
    });
  
    it('should edit a task', () => {
      cy.contains('E2E Test Task').parent().find('button').click();
      cy.contains('Edit').click();
      cy.get('#title').clear().type('Updated E2E Test Task');
      cy.contains('Save').click();
      cy.contains('Updated E2E Test Task').should('be.visible');
    });
  
    it('should mark a task as complete', () => {
      cy.contains('Updated E2E Test Task').parent().find('button').click();
      cy.contains('Complete').click();
      cy.contains('Updated E2E Test Task').parent().should('contain', 'completed');
    });
  
    it('should delete a task', () => {
      cy.contains('Updated E2E Test Task').parent().find('button').click();
      cy.contains('Delete').click();
      cy.contains('Confirm').click();
      cy.contains('Updated E2E Test Task').should('not.exist');
    });
  
    it('should filter tasks', () => {
      cy.get('input[placeholder="Search tasks..."]').type('E2E');
      cy.contains('E2E Test Task').should('be.visible');
      cy.contains('Another Task').should('not.exist');
    });
  
    it('should sort tasks', () => {
      cy.contains('th', 'Title').click();
      cy.get('tbody tr').first().should('contain', 'A Task'); // Assuming 'A Task' should be first alphabetically
      cy.contains('th', 'Title').click();
      cy.get('tbody tr').first().should('contain', 'Z Task'); // Assuming 'Z Task' should be last alphabetically
    });
  
    it('should paginate tasks', () => {
      cy.get('tbody tr').should('have.length', 10); // Assuming 10 tasks per page
      cy.contains('Next').click();
      cy.get('tbody tr').first().should('not.contain', 'E2E Test Task'); // Assuming 'E2E Test Task' was on the first page
    });
  
    it('should show task details', () => {
      cy.contains('E2E Test Task').click();
      cy.get('dialog').should('be.visible');
      cy.get('dialog').should('contain', 'E2E Test Task');
      cy.get('dialog').should('contain', '2023-12-31');
      cy.get('dialog').should('contain', 'E2E Tester');
    });
  
    it('should update task status from details view', () => {
      cy.contains('E2E Test Task').click();
      cy.get('dialog').contains('Mark as Complete').click();
      cy.get('dialog').should('contain', 'completed');
      cy.get('dialog').contains('Close').click();
      cy.contains('E2E Test Task').parent().should('contain', 'completed');
    });
  });