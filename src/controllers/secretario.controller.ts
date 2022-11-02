import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Secretario} from '../models';
import {SecretarioRepository} from '../repositories';

export class SecretarioController {
  constructor(
    @repository(SecretarioRepository)
    public secretarioRepository : SecretarioRepository,
  ) {}

  @post('/secretarios')
  @response(200, {
    description: 'Secretario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Secretario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Secretario, {
            title: 'NewSecretario',
            exclude: ['id'],
          }),
        },
      },
    })
    secretario: Omit<Secretario, 'id'>,
  ): Promise<Secretario> {
    return this.secretarioRepository.create(secretario);
  }

  @get('/secretarios/count')
  @response(200, {
    description: 'Secretario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Secretario) where?: Where<Secretario>,
  ): Promise<Count> {
    return this.secretarioRepository.count(where);
  }

  @get('/secretarios')
  @response(200, {
    description: 'Array of Secretario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Secretario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Secretario) filter?: Filter<Secretario>,
  ): Promise<Secretario[]> {
    return this.secretarioRepository.find(filter);
  }

  @patch('/secretarios')
  @response(200, {
    description: 'Secretario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Secretario, {partial: true}),
        },
      },
    })
    secretario: Secretario,
    @param.where(Secretario) where?: Where<Secretario>,
  ): Promise<Count> {
    return this.secretarioRepository.updateAll(secretario, where);
  }

  @get('/secretarios/{id}')
  @response(200, {
    description: 'Secretario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Secretario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Secretario, {exclude: 'where'}) filter?: FilterExcludingWhere<Secretario>
  ): Promise<Secretario> {
    return this.secretarioRepository.findById(id, filter);
  }

  @patch('/secretarios/{id}')
  @response(204, {
    description: 'Secretario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Secretario, {partial: true}),
        },
      },
    })
    secretario: Secretario,
  ): Promise<void> {
    await this.secretarioRepository.updateById(id, secretario);
  }

  @put('/secretarios/{id}')
  @response(204, {
    description: 'Secretario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() secretario: Secretario,
  ): Promise<void> {
    await this.secretarioRepository.replaceById(id, secretario);
  }

  @del('/secretarios/{id}')
  @response(204, {
    description: 'Secretario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.secretarioRepository.deleteById(id);
  }
}
