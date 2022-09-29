/**
 * @swagger
 * /searchs/users:
 *   get:
 *     summary: Searchs users by given data (part of username or first- and last- names)
 *     tags:
 *       - Searchs
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     requestBody:
 *       description: Subsequence of user's username or name
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Users are found and returned
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
 *                   required: users
 *                   properties:
 *                     users:
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