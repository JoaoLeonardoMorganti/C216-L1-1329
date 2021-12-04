Feature: test script for 'encomenda'

Background:
  * url 'http://localhost:5001/encomenda'

Scenario: Inserir encomendas
  * def encomenda =
  """
  {
    "origem": "cidade1",
    "destino": "cidade2",
    "peso": "xxx g",
    "data": "dd/mm/aaaa"
  }
  """

  Given path 'insert'
  And request encomenda
  When method post
  Then status 200
  And match $.affectedRows == 1

Scenario: Listas todas as encomendas
  Given path 'list'
  When method get
  Then status 200
  And match each $ contains { id : '#number', origem : '#string', destino : '#string', peso : '#string', data : '#string' }

Scenario: Atualizar uma encomenda através de seu ID [primeira encomenda da tabela]

    Given path 'list'
    When method get
    Then status 200
    * def encomendaOriginal = response[0]

    * def encomendaModificado =
    """
    {   
        "id": '#(encomendaOriginal.id)',
        "origem": "cidade1_atualizado",
        "destino": "cidade2_atualizado",
        "peso": "xxx g_atualizado",
        "data": "dd/mm/aaaa_atualizado"
    }
    """

    Given path 'update'
    And request encomendaModificado
    When method put
    Then status 200
    And match response.affectedRows == 1

    Given path 'list'
    When method get
    Then status 200
    * def encomendaDepois = response[0]
    And match encomendaDepois.id == encomendaOriginal.id
    And match encomendaDepois.origem == encomendaModificado.origem
    And match encomendaDepois.destino == encomendaModificado.destino
    And match encomendaDepois.peso == encomendaModificado.peso
    And match encomendaDepois.data == encomendaModificado.data

Scenario: Eclusão de encomenda a partir de seu ID

  Given path 'list'
  When method get
  Then status 200
  * def encomenda =
  """
  {
    "id": '#(response[0].id)'
  }
  """

  Given path 'exclude'
  And request encomenda
  When method delete
  Then status 200
  And match response.affectedRows == 1

  Given path 'exclude'
  And request encomenda
  When method delete
  Then status 200
  And match response.affectedRows == 0

Scenario: Procura de encomenda a partir de seu ID

    Given path 'list'
    When method get
    Then status 200
    * def primeiraEncomenda = response[0]
    * def encomendaID = response[0].id
    * def parameter = "?id=" + encomendaID
  
    Given path 'search' + parameter
    When method get
    Then status 200
    And match response[0] == primeiraEncomenda