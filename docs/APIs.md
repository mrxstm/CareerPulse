1. Authentication :
POST api/auth/register
POST api/auth/login
POST api/auth/logout
GET api/auth/me

2. Users :

GET api/users/profile
PATCH api/users/profile
PATCH api/users/profile-image

3. Resume :

GET api/resumes
POST api/resumes
GET api/resumes/:id
PATCH api/resumes/:id
DELETE api/resumes/:id

4. Analysis :

GET api/analyses
GET api/analyses/:id
POST api/analyses
DELETE api/analyses/:id
POST /api/analyses/:id/regenerate-roadmap

5. Dashboard :

GET api/dashboard

6. Roadmaps
GET    api/roadmaps/:analysisId
PATCH  api/roadmaps/steps/:id






