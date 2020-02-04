var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

// GraphQL schema
const schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(title: String): [Course]
    },
    type Course {
        id: Int
        title: String
        author: String        
    }
`);

const coursesData= [
    {
        id: 1,
        title: 'Complete knowledge',
        author: 'K K'
    },
    {
        id: 2,
        title: 'Aladdin',
        author: 'Disney'
    },
    {
        id:3,
        title: 'James Bond',
        author: '007'
    }
]

const getCourse = (args) => {
    let id = args.id;
    return coursesData.filter(course => {
        return course.id === id;
    })[0];
}

const getCourses = (args) => {
    if (args.title) {
        let title = args.topic;
        return coursesData.filter(course => course.title === title);        
    } else {
        return coursesData;
    }
}

// Root resolver
const root = {
    course: getCourse,
    courses: getCourses
};
// Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(3000, () => console.log('Server now running on 3000/graphql Port'));