/**
 * @swagger
 * /users/{userId}/friends:
 *   get:
 *     summary: Returns friends of user by given id
 *     tags:
 *       - Users
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParameter'
 *     responses:
 *       '200':
 *         description: User is found and it's friends are returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - status
 *                 - data
 *               properties:
 *                 status:
 *                   $ref: '#/components/schemas/200StatusSchema'
 *                 data:
 *                   type: object
 *                   required: friends
 *                   properties:
 *                     friends:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/DefaultUserOutput'
 *       '401':
 *         $ref: '#/components/responses/401Error'
 *       '404':
 *         $ref: '#/components/responses/404Error'
 *       '500':
 *         $ref: '#/components/responses/500Error'
 * 
 */

/**
 * @swagger
 * /users/{userId}/friends/{friendId}:
 *   delete:
 *     summary: Removes friend by given id of user by given id
 *     tags:
 *       - Users
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     parameters:
 *       - $ref: '#/components/parameters/friendIdParameter'
 *     responses:
 *       '200':
 *         description: User and it's friend are found and last one is deleted from first one's friends list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - status
 *                 - data
 *               properties:
 *                 status:
 *                   $ref: '#/components/schemas/200StatusSchema'
 *                 data:
 *                   type: integer
 *                   example: null
 *       '400':
 *         $ref: '#/components/responses/400Error'
 *       '401':
 *         $ref: '#/components/responses/401Error'
 *       '403':
 *         $ref: '#/components/responses/403Error' 
 *       '404':
 *         $ref: '#/components/responses/404Error'
 *       '500':
 *         $ref: '#/components/responses/500Error'
 * 
 */

/**
 * @swagger
 * /users/{userId}/friends/requests/incomings:
 *   get:
 *     summary: Returns incoming friends requests of user by given id
 *     tags:
 *       - Users
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParameter'
 *     responses:
 *       '200':
 *         description: User is found and it's incoming friends requests are returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - status
 *                 - data
 *               properties:
 *                 status:
 *                   $ref: '#/components/schemas/200StatusSchema'
 *                 data:
 *                   type: object
 *                   required: icomingFriendsRequests
 *                   properties:
 *                     icomingFriendsRequests:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/FriendsRequest'
 *       '401':
 *         $ref: '#/components/responses/401Error'
 *       '403':
 *         $ref: '#/components/responses/403Error'
 *       '404':
 *         $ref: '#/components/responses/404Error'
 *       '500':
 *         $ref: '#/components/responses/500Error'
 * 
 */

/**
 * @swagger
 * /users/{userId}/friends/requests/outcomings:
 *   get:
 *     summary: Returns outcomig friends requests of user by given id
 *     tags:
 *       - Users
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParameter'
 *     responses:
 *       '200':
 *         description: User is found and it's outcoming friends requests are returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - status
 *                 - data
 *               properties:
 *                 status:
 *                   $ref: '#/components/schemas/200StatusSchema'
 *                 data:
 *                   type: object
 *                   required: outcomingFriendsRequests
 *                   properties:
 *                     outcomingFriendsRequests:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/FriendsRequest'
 *       '401':
 *         $ref: '#/components/responses/401Error'
 *       '403':
 *         $ref: '#/components/responses/403Error'
 *       '404':
 *         $ref: '#/components/responses/404Error'
 *       '500':
 *         $ref: '#/components/responses/500Error'
 * 
 */

/**
 * @swagger
 * /users/{userId}/friends/requests/outcomings:
 *   post:
 *     summary: Creates outcomig friends requests from user by given id to user with id given in request body
 *     tags:
 *       - Users
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParameter'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: Id of user to whom request is wanted to be sent
 *     responses:
 *       '201':
 *         headers:
 *           Location:
 *             schema:
 *               type: string
 *             description: Location header with relative URL to created friends request
 *         description: Users were found and outcoming friends requests was created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - status
 *                 - data
 *               properties:
 *                 status:
 *                   $ref: '#/components/schemas/201StatusSchema'
 *                 data:
 *                   type: integer
 *                   example: null
 *       '400':
 *         $ref: '#/components/responses/400Error'
 *       '401':
 *         $ref: '#/components/responses/401Error'
 *       '403':
 *         $ref: '#/components/responses/403Error'
 *       '404':
 *         $ref: '#/components/responses/404Error'
 *       '409':
 *         $ref: '#/components/responses/409Error' 
 *       '500':
 *         $ref: '#/components/responses/500Error'
 * 
 */

/**
 * @swagger
 * /users/{userId}/friends/requests/incomings/{friendsRequestId}:
 *   get:
 *     summary: For user by given id get incoming friends requests by given id
 *     tags:
 *       - Users
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParameter'
 *       - $ref: '#/components/parameters/friendsRequestIdParameter'
 *     responses:
 *       '200':
 *         description: User and it's incoming friends request were found and that request was returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - status
 *                 - data
 *               properties:
 *                 status:
 *                   $ref: '#/components/schemas/200StatusSchema'
 *                 data:
 *                   type: object
 *                   required: incomingFriendsRequest
 *                   properties:
 *                     incomingFriendsRequest:
 *                       $ref: '#/components/schemas/FriendsRequest'
 *       '401':
 *         $ref: '#/components/responses/401Error'
 *       '403':
 *         $ref: '#/components/responses/403Error'
 *       '404':
 *         $ref: '#/components/responses/404Error'
 *       '500':
 *         $ref: '#/components/responses/500Error'
 * 
 */

/**
 * @swagger
 * /users/{userId}/friends/requests/incomings/{friendsRequestId}:
 *   put:
 *     summary: For user by given id answer an incoming friends requests by given id
 *     tags:
 *       - Users
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParameter'
 *       - $ref: '#/components/parameters/friendsRequestIdParameter'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answer:
 *                 type: string
 *                 description: Answer to the friends request
 *                 example: "Confirm"
 *     responses:
 *       '200':
 *         description: User and it's incoming friends request were found and that request was answered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - status
 *                 - data
 *               properties:
 *                 status:
 *                   $ref: '#/components/schemas/200StatusSchema'
 *                 data:
 *                   type: integer
 *                   example: null
 *       '401':
 *         $ref: '#/components/responses/401Error'
 *       '403':
 *         $ref: '#/components/responses/403Error'
 *       '404':
 *         $ref: '#/components/responses/404Error'
 *       '500':
 *         $ref: '#/components/responses/500Error'
 * 
 */

/**
 * @swagger
 * /users/{userId}/friends/requests/outcomings/{friendsRequestId}:
 *   get:
 *     summary: For user by given id get outcoming friends requests by given id
 *     tags:
 *       - Users
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParameter'
 *       - $ref: '#/components/parameters/friendsRequestIdParameter'
 *     responses:
 *       '200':
 *         description: User and it's outcoming friends request were found and that request was returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - status
 *                 - data
 *               properties:
 *                 status:
 *                   $ref: '#/components/schemas/200StatusSchema'
 *                 data:
 *                   type: object
 *                   required: outcomingFriendsRequest
 *                   properties:
 *                     outcomingFriendsRequest:
 *                       $ref: '#/components/schemas/FriendsRequest'
 *       '401':
 *         $ref: '#/components/responses/401Error'
 *       '403':
 *         $ref: '#/components/responses/403Error'
 *       '404':
 *         $ref: '#/components/responses/404Error'
 *       '500':
 *         $ref: '#/components/responses/500Error'
 * 
 */

/**
 * @swagger
 * /users/{userId}/friends/requests/outcomings/{friendsRequestId}:
 *   delete:
 *     summary: For user by given id delete outcoming friends requests by given id
 *     tags:
 *       - Users
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParameter'
 *       - $ref: '#/components/parameters/friendsRequestIdParameter'
 *     responses:
 *       '200':
 *         description: User and it's outcoming friends request were found and that request was deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - status
 *                 - data
 *               properties:
 *                 status:
 *                   $ref: '#/components/schemas/200StatusSchema'
 *                 data:
 *                   type: integer
 *                   example: null
 *       '401':
 *         $ref: '#/components/responses/401Error'
 *       '403':
 *         $ref: '#/components/responses/403Error'
 *       '404':
 *         $ref: '#/components/responses/404Error'
 *       '500':
 *         $ref: '#/components/responses/500Error'
 * 
 */