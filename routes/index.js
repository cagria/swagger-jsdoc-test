const express = require('express');
const util = require('util');

const router = express.Router();

// default greeting
let greeting = "Hello";

/**
 * @swagger
 * definitions:
 *   HelloWorldResponse:
 *     required:
 *       - message
 *     properties:
 *       message:
 *         type: string
 *   ErrorResponse:
 *     required:
 *       - message
 *     properties:
 *       message:
 *         type: string
 */


router.get('/', (req, res) => res.send('Hello World!'));

/**
 * @swagger
 * /hello:
 *   get:
 *     description: Returns 'Hello' to the caller
 *     parameters:
 *       - name: name
 *         in: query
 *         description: The name of the person to whom to say hello
 *         required: true
 *         type: string
 *     responses:
 *       "200":
 *         description: Success
 *         schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *       default:
 *         description: Error
 *         schema:
 *           $ref: "#/definitions/ErrorResponse"
 */

router.get('/hello', (req, res) => {
    const name = req.query.name || 'stranger';
    const hello = util.format('%s, %s!', greeting, name);

    res.json(hello);
});

/**
 * @swagger
 * /hello:
 *   post:
 *     description: Returns 'Hello' to the caller
 *     parameters:
 *       - name: name
 *         in: body
 *         description: The name of the person to whom to say hello
 *         required: true
 *         schema:
 *           required:
 *             - name
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       "200":
 *         description: Success
 *         schema:
 *           $ref: "#/definitions/HelloWorldResponse"
 *       default:
 *         description: Error
 *         schema:
 *           $ref: "#/definitions/ErrorResponse"
 */

router.post('/hello', (req, res) => {
    const hello = util.format('%s, %s!', greeting, req.body.name);
    res.json(hello);
});

/**
 * @swagger
 * /hello:
 *   put:
 *     description: Updates the greeting
 *     parameters:
 *       - name: greeting
 *         in: body
 *         description: The greeting string
 *         required: true
 *         schema:
 *           required:
 *             - greeting
 *           properties:
 *             greeting:
 *               type: string
 *               minLength: 1
 *     responses:
 *       "200":
 *         description: Success
 *         schema:
 *           $ref: "#/definitions/HelloWorldResponse"
 *       default:
 *         description: Error
 *         schema:
 *           $ref: "#/definitions/ErrorResponse"
 */

router.put('/hello', (req, res) => {
    greeting = req.body.greeting;
    res.json(util.format('Greeting message updated to %s', greeting));
});

module.exports = router;
