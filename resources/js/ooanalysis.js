var names = [
    {name: "Daniel Gimenez", pic: "daniel", count: 0},
    {name: "Davison Santana", pic: "davison", count: 0},
    {name: "Erickson D'rique", pic: "erickson", count: 0},
    {name: "Fernando Augusto", pic: "fernando", count: 0},
    {name: "Jean Akiyo", pic: "jean", count: 0},
    {name: "kelvin klein", pic: "kelvin", count: 0},
    {name: "Marco de Azevedo Ferreira", pic: "marco", count: 0},
    {name: "Paulo Campaneli", pic: "paulo", count: 0},
    {name: "Rômulo Oliveira", pic: "romulo", count: 0},
    {name: "Victor Sanches", pic: "victor", count: 0},
    {name: "willian gois", pic: "willian", count: 0}
];

var subjects = [
    {name: "OCP", desc: "Open Closed Principle"},
    {name: "DRY", desc: "Don't Repeat Yourself"},
    {name: "SRP", desc: "Single ResponsIbility Principle"},
    {name: "ISP", desc: "Interface Segregation Principle"},    
    {name: "Pair programming", desc: "Funcionamento, situações e etc."},
    {name: "Builder", desc: "Funcionamento, situações e etc."},
    {name: "Observer", desc: "Funcionamento, situações e etc."},
    {name: "Refactoring", desc: "Funcionamento, situações e etc."},
    {name: "Análise O.O.", desc: "Do ponto de vista do usuário, o que define um bom software?"},
    {name: "Análise O.O.", desc: "Do ponto de vista do programador, o que define um bom software?"},
    {name: "Análise O.O.", desc: "Como você garante que o sistema vai fazer o que eu preciso?"},
    {name: "Caso de uso", desc: "Elementos, situações e etc."},
    {name: "Peer review", desc: "Quando você fizer um peer review, qual será sua maior preocupação?"},
    {name: "Manutenibilidade", desc: "Características, situações e etc."},
    {name: "Flexibilidade", desc: "Características, situações e etc."},
    {name: "Extensibilidade", desc: "Características, situações e etc."},
    {name: "TDD", desc: "Test drIven Development. Funcionamento, situações e etc."},
    {name: "Red-Green-Refactor", desc: "Funcionamento, situações e etc."},
    {name: "JUnit", desc: "Funcionamento, situações e etc."},
    {name: "MVC", desc: "Model-view-controller. Funcionamento, situações e etc."},
    {name: "Design thinking", desc: "Prototipação. Dinâmica, situações e etc."},
    {name: "Template method", desc: "Funcionamento, situações e etc."},
    {name: "Encapsulamento", desc: "Variáveis, métodos e etc."}
];
var chosenNames = [];
var chosenSubjects = [];

var app = angular.module('analiseApp', ['ngAnimate']).directive('animateOnChange', function ($timeout) {
    return function (scope, element, attr) {
        scope.$watch(attr.animateOnChange, function (nv, ov) {
            if (nv != ov) {
                element.addClass('changed');
                $timeout(function () {
                    element.removeClass('changed');
                }, 1000);
            }
        });
    };
});
;

var mytimeout;

app.controller('formCtrl', function ($scope, $timeout) {

    $scope.seconds = 180;
    $scope.counter = $scope.seconds;

    $scope.$watch('seconds', function () {
        if ($scope.seconds < 0) {
            $scope.seconds = 0;
        }
        $scope.counter = $scope.seconds;
    }, true);

    $scope.increaseSeconds = function () {
        $scope.seconds = $scope.seconds + 30;
        $scope.counter = $scope.seconds;
    };

    $scope.decreaseSeconds = function () {
        if ($scope.seconds > 1) {
            $scope.seconds = $scope.seconds - 30;
            $scope.counter = $scope.seconds;
        }
    };

    $scope.startButton = 'Start !';
    $scope.pauseButton = 'Pause';
    $scope.allNamesOutput = names;
    $scope.chosenNames = chosenNames;

    var sortedNameElement = null;
    var sortedSubjectElement = null;

    $scope.pickRandom = function () {
        $scope.startButton = 'Next !';

        if (sortedNameElement !== null && sortedSubjectElement !== null) {
            chosenNames.push(sortedNameElement);
            chosenSubjects.push(sortedSubjectElement);
        }

        startTimer($scope, $timeout);
        // reset arrays            
        if (names.length === 0) {
            names = names.concat(chosenNames);
            chosenNames = [];
        }

        if (subjects.length === 0) {
            subjects = subjects.concat(chosenSubjects);
            chosenSubjects = [];
        }

        sortedNameElement = names.popRandomElement();
        sortedNameElement.count++;

        sortedSubjectElement = subjects.popRandomElement();

        $scope.sortOutput = sortedNameElement;
        $scope.sortedSubjectOutput = sortedSubjectElement;
        $scope.allNamesOutput = names;
        $scope.chosenNames = chosenNames;
        $scope.chosenSubjects = chosenSubjects;
    };
});

Array.prototype.popRandomElement = function () {
    var elIndex = Math.floor(Math.random() * this.length);
    var result = this[elIndex];
    this.splice(elIndex, 1);
    return result;
};

function startTimer($scope, $timeout) {
    $timeout.cancel(mytimeout);

    $scope.counter = $scope.seconds;
    $scope.stopped = false;
    $scope.onTimeout = function () {
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout, 1000);
        if ($scope.counter === -1) {
            $timeout.cancel(mytimeout);
            $scope.pickRandom();
        }
    };

    mytimeout = $timeout($scope.onTimeout, 1000);

    $scope.pause = function () {
        if (!$scope.stopped) {
            $timeout.cancel(mytimeout);
            $scope.pauseButton = 'Resume';
        }
        else
        {
            mytimeout = $timeout($scope.onTimeout, 1000);
            $scope.pauseButton = 'Pause';
        }
        $scope.stopped = !$scope.stopped;
    };
}