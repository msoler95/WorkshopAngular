
angular.module('miAp', ['ngRoute'])


function ControladorFiltros($scope) {
  $scope.empleados =
    [
      {
        Imagen:'imagenes/marc.jpg', Nom:'Marc',  diners: 0, numero: 0, pres: false, visible: true
      },
      {
        Imagen:'imagenes/salva.jpg', Nom:'Salva',  diners: 0, numero: 1, pres: false, visible: true
      },
      {
        Imagen:'imagenes/hele.jpg', Nom:'Hele', diners: 0, numero: 2, pres: false, visible: true
      },
      {
        Imagen:'imagenes/gonzalo.jpg', Nom:'Gonz',  diners: 0, numero: 3, pres: false, visible: true
      },
      {
        Imagen:'imagenes/victor.jpg', Nom:'Victor',  diners: 0, numero: 4, pres: false, visible: true
      },



    ];

    $scope.comidas=
    [
      {
        Imagen:'imagenes/sanmiguel.png', Nom:'Birra', precio: 1.2, numero: 0, visible: true
      },
      {
        Imagen:'imagenes/braves.png', Nom:'Braves',  precio: 3.2, numero: 1, visible: true
      },
    ];

    $scope.ordenarPor = function(orden){
      $scope.ordenSeleccionado = orden;
    };



    $scope.micuenta = {foto: '', persona:'', producto:'', precio:''};

    $scope.historials = [];

    

    $scope.go = function(numerocomida){
          
          if($scope.booleliminar) $scope.comidas[numerocomida].visible = false; /*Actua como borrador de comida*/
          else{ /*Actua para añadir el producto a unapersona*/
              var i = 0;
              while(i < $scope.empleados.length){
                if($scope.empleados[i].pres) { 
                    $scope.empleados[i].diners += $scope.comidas[numerocomida].precio/$scope.personeselecionades;
                    $scope.empleados[i].diners = ($scope.empleados[i].diners).toFixed(2)*1
                    if($scope.personeselecionades == 1) $scope.micuenta = {foto: $scope.empleados[i].Imagen, persona: $scope.empleados[i].Nom, producto:$scope.comidas[numerocomida].Nom, precio:$scope.comidas[numerocomida].precio, id: $scope.empleados[i].numero, visible: true};
                    else if($scope.personeselecionades > 1) $scope.micuenta = {foto: $scope.empleados[i].Imagen, persona: $scope.empleados[i].Nom, producto:$scope.comidas[numerocomida].Nom + "/" + $scope.personeselecionades, precio:($scope.comidas[numerocomida].precio/$scope.personeselecionades).toFixed(2)*1, id: $scope.empleados[i].numero, visible: true};
                    $scope.historials.push($scope.micuenta);
                }
                ++i;
               }
          }
     
      
    };

    /*historial de cuentas*/

    $scope.varnom='';

    $scope.agregapersona= function(){
      $scope.persona = {Imagen: 'imagenes/perfil.jpg', Nom: $scope.varnom, diners: 0, numero: $scope.empleados.length, pres: false, visible: true};
      $scope.empleados.push($scope.persona);
      $scope.varnom= '';
    }

    $scope.varpreu = 0;

     $scope.agregamenjar= function(){
      $scope.comidaup = {Imagen:'imagenes/comida.png', Nom: $scope.varmenjar, precio: $scope.varpreu*1, numero: $scope.comidas.length, visible: true};
      $scope.comidas.push($scope.comidaup);
      $scope.varmenjar='';
      $scope.varpreu=0;
    }

    $scope.personeselecionades = 0;

    $scope.cambiapres = function(pres, posicio){
      if (pres) {
          $scope.empleados[posicio].pres = false;
          --$scope.personeselecionades;
        }
      else {
        $scope.empleados[posicio].pres = true;
        ++$scope.personeselecionades;
      }

    }

    $scope.reiniciar = function(){
      var i = 0;
      while(i < $scope.empleados.length){
        $scope.empleados[i].diners = 0;
        ++i;
      }
      $scope.historials = [];
    };

    $scope.booleliminar = false; /*Indica si el boto eliminar ha estat apretat*/
    $scope.texteliminar = "Eliminar productos";
     $scope.dissenyeliminar = "btn btn-danger";

    $scope.borrarpersona = function(){
      
      if($scope.booleliminar == false){
           $scope.booleliminar = true;
           $scope.texteliminar = "Hecho";
           $scope.dissenyeliminar = "btn btn-success";
      }
      else{
            $scope.booleliminar = false;
           $scope.texteliminar = "Eliminar productos";
            $scope.dissenyeliminar = "btn btn-danger";
      }
    };

    $scope.eliminarpersona = function(id){
      if($scope.booleliminar){
        $scope.empleados[id].visible = false;
          $scope.empleados[id].pres = false;
          var j = 0;
          while(j < $scope.historials.length) {
            if($scope.historials[j].id == id) $scope.historials[j].visible = false;
            ++j;
          }

      }
    }

    $scope.borrarhistorial = function(id, precio){
      $scope.empleados[id].diners -= precio; 
      if($scope.empleados[id].diners < 0) $scope.empleados[id].diners = 0; 
      
    }

   
   
  
};

