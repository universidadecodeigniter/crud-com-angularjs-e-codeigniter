app.controller('AdminController', function($scope,$http){
  $scope.pools = [];
});

app.controller('NotaController', function(dataFactory,$scope,$http){
  $scope.data = [];
  $scope.pageNumber = 1;
  $scope.libraryTemp = {};
  $scope.totalItemsTemp = {};
  $scope.totalItems = 0;
  $scope.pageChanged = function(newPage) {
    getResultsPage(newPage);
  };

  getResultsPage(1);

  function getResultsPage(pageNumber) {
    if(! $.isEmptyObject($scope.libraryTemp)){
      dataFactory.httpRequest('/notas?search='+$scope.searchText+'&page='+pageNumber).then(function(data) {
        $scope.data = data.data;
        $scope.totalItems = data.total;
        $scope.pageNumber = pageNumber;
      });
    }else{
      dataFactory.httpRequest('/notas?page='+pageNumber).then(function(data) {
        $scope.data = data.data;
        $scope.totalItems = data.total;
        $scope.pageNumber = pageNumber;
      });
    }
  }

  $scope.searchDB = function(){
    if($scope.searchText.length >= 3){
      if($.isEmptyObject($scope.libraryTemp)){
        $scope.libraryTemp = $scope.data;
        $scope.totalItemsTemp = $scope.totalItems;
        $scope.data = {};
      }
      getResultsPage(1);
    }else{
      if(! $.isEmptyObject($scope.libraryTemp)){
        $scope.data = $scope.libraryTemp ;
        $scope.totalItems = $scope.totalItemsTemp;
        $scope.libraryTemp = {};
      }
    }
  }

  $scope.saveAdd = function(){
    dataFactory.httpRequest('notasCreate','POST',{},$scope.form).then(function(data) {
      $scope.data.push(data);
      $(".modal").modal("hide");
    });
  }

  $scope.edit = function(id){
    dataFactory.httpRequest('notasEdit/'+id).then(function(data) {
      console.log(data);
      $scope.form = data;
    });
  }

  $scope.saveEdit = function(){
    dataFactory.httpRequest('notasUpdate/'+$scope.form.id,'PUT',{},$scope.form).then(function(data) {
      $(".modal").modal("hide");
      $scope.data = apiModifyTable($scope.data,data.id,data);
    });
  }

  $scope.remove = function(nota,index){
    var result = confirm("Tem certeza que deseja remover essa nota?");
    if (result) {
      dataFactory.httpRequest('notasDelete/'+nota.id,'DELETE').then(function(data) {
        $scope.data.splice(index,1);
      });
    }
  }

});
