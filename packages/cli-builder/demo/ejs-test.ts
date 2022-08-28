import ejs from 'ejs';

const str = `
  <% if (user) { %>
    <h2><%= user.name %></h2>
  <% } %>
`;

// let template = ejs.compile(str);
// const newStr = template({ user: { name: 'test' } });

// console.log('str', newStr);

ejs.render(str);
