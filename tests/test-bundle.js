import sinon from 'sinon';
import { expect } from 'chai';
import supertest from 'supertest';
import dotenv from 'dotenv';

dotenv.load();

global.sinon  = sinon;
global.expect = expect;
global.api    = supertest.agent('http://localhost:4200');
