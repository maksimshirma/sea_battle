<h1>Sea Battle</h1>

В данном проекте была реализована игра морской бой, в которой пользователь может играть как против ИИ, так и против друга на одном компьютере.

В проекте было реализовано:

-   простой алгоритм для ИИ
-   возможность играть против друга
-   расстановка кораблей Drag and Drop
-   анимация промахов и попаданий
-   сохранение данных при перезагрузке с помощью Redux Persist
-   смена темы
-   адаптивная вёрстка

<h2>Алгоритмы ИИ</h2>

Я не пытался придумать ничего сложного и подошёл к задаче написания ИИ с математической точки зрения. В игре представлено 3 уровня сложности: лёгкий, средний и сложный.

На лёгком уровне ИИ выбирает случайную клетку на поле и стреляет в неё.

На среднем уровне ИИ также выбирает случайную клетку, но если в ней не оказалось палумбы корабля, он повторно выбирает случайную клетку, при этом координаты первой выбранной клетки сохраняются, поэтому выстрелить в одну и ту же клетку он не может.

На сложном уровне ИИ имеет возможность выбирать новую клетку 2 раза.

Таким образом, с каждым последующим уровнем сложности ИИ начинает чаще попадать по кораблям.

Код алгоритма выбора клетки:

```
const getRandomBlock = () => {
   let i = getRandomBetween(0, 9);
   let j = getRandomBetween(0, 9);
   while (userField[i][j] === 3 || userField[i][j] === 2) {
      i = getRandomBetween(0, 9);
      j = getRandomBetween(0, 9);
   }
   return { i, j };
};

const getBlock = () => {
   if (difficulty === "hard") {
      const { i, j } = getRandomBlock();
      if (userField[i][j] === 1) {
         return { i, j };
      } else {
         const { i, j } = getRandomBlock();
         if (userField[i][j] === 1) {
            return { i, j };
         }
      }
      return getRandomBlock();
   }

   if (difficulty === "normal") {
      const { i, j } = getRandomBlock();
      if (userField[i][j] === 1) {
         return { i, j };
      }
      return getRandomBlock();
   }

return getRandomBlock();
};
```

<h2>Технологии:</h2>

-   React
-   Redux, Redux/ToolKit
-   Redux Persist
-   TypeScript
-   scss modules
-   vite
-   ESlint, Prettier

<h2>Установка</h2>

Для того, чтобы запустить проект, необходимо склонировать репозиторий:

```
git clone https://github.com/maksimshirma/sea_battle.git
```

После понадобится установить зависимости:

```
npm install
```

Далее необходимо ввести следующую команду:

```
npm run dev
```

После чего в консоли появится адрес локалхост, при нажатии на который будет открыто приложение.

<h2>Демо</h2>

Приложение расположено на одной странице.

В правом верхнем углу располагаются сервисные кнопки. Левая кнопка отвечает за правила, средняя - за смену темы, и крайняя правая - за сброс настроек игры.

<h3>Тёмная тема:</h3>

![image](https://github.com/maksimshirma/sea_battle/assets/110569339/67b08312-38f8-4af2-a36f-3eec4ff8c7f5)

<h3>Светлая тема:</h3>

![image](https://github.com/maksimshirma/sea_battle/assets/110569339/89e2e80a-db33-422c-a36f-aacc55e06e11)

<h3>Правила:</h3>

![image](https://github.com/maksimshirma/sea_battle/assets/110569339/eb5d0904-e126-45dc-b0f5-7d09a89b4de1)

В центре страницы располагается игровое поле.

По середине представлено меню настроек, в котором можно выбрать режим игры, против кого играть, автоматическую расстановку кораблей. После выставления всех настроек можно начинать играть, при нажатии на кнопку "Играть", игра запустится.

Слева и справа от настроек располагаются игровые поля. Сверху можно указать имя владельца поля. Рядом с именем располагается счёт - количесвто выигранных боёв.

После выбора режима сложности у пользователя открывается панель с кораблями. Расставить их можно вручную либо автоматически.

После расстановки кораблей, необходимо нажать "Принять", чтобы применить полученную расстановку.

![image](https://github.com/maksimshirma/sea_battle/assets/110569339/7db9bc97-a92f-4b09-9e71-c914491c0d50)

При выборе игры против друга, после расстановки кораблей на первом поле, необходимо будет их расставить на втором поле.

![image](https://github.com/maksimshirma/sea_battle/assets/110569339/7d3da592-fc0f-4a1e-b419-39869ef22f1e)

Чтобы начать играть необходимо нажать кнопку "Играть".

В процессе игры против ИИ.

![image](https://github.com/maksimshirma/sea_battle/assets/110569339/1c74b94e-798e-4274-9a4e-519f07dc55d9)

После того, как все корабли одной стороны будут уничтожены появится окно с окончанием игры, и счёт побед прибавится в копилку победителя.

![image](https://github.com/maksimshirma/sea_battle/assets/110569339/6f4bac87-eab4-4200-93bf-9c629328491b)

Теперь можно начинать новую игру.
