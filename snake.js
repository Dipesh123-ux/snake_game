function init()
{
     canvas = document.getElementById('snake_canvas');
     w = h = canvas.height = canvas.width = 500;
      pen = canvas.getContext('2d');
      cl = 20;
      food = get_food() ;
     game_over = false;

     snake = {
         length:5,
         color:'white',
         cells : [],
         direction:'right',


         create_snake : function()
         {
             for(var i = this.length; i > 0; i--)
             {
                 this.cells.push({x:i , y:0});
             }
         },
         draw_Snake : function()
         {
             for(var i = 0; i < this.cells.length; i++)
             {
                 pen.fillStyle = this.color;
                 pen.fillRect(this.cells[i].x*cl , this.cells[i].y*cl,cl-1,cl-1);
            
            
             }
         },

         update_snake : function()
         {
             
             var headx = this.cells[0].x;
             var heady = this.cells[0].y;

            if(headx == food.x && heady == food.y)
            {
                food = get_food();
            }
            else
            {
                this.cells.pop();
            }

             var nextX , nextY;

             if(snake.direction == "right")
             {
                nextX = headx + 1;
                nextY = heady;
             }
            else if(snake.direction == "left")
             {
                nextX = headx - 1;
                nextY = heady;
             }
            else if(snake.direction == "up")
             {
                nextX = headx ;
                nextY = heady - 1;
             }
            else if(snake.direction == "down")
             {
                nextX = headx;
                nextY = heady + 1;
             }

             this.cells.unshift({x: nextX, y: nextY});

            last_X = Math.round(w/cl - 1);
            last_y = Math.round(h/cl - 1);

            if(this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].y > last_y || this.cells[0].x > last_X)
            {
                game_over = true;
            }

        
            }

         
     },

   
     snake.create_snake();

   function keypressed(e)
   {
       if(e.key == 'ArrowRight')
       {
           snake.direction = "right";
       }
       else if(e.key == 'ArrowLeft')
       {
           snake.direction = "left";
       }
       else if(e.key == 'ArrowUp')
       {
           snake.direction = "up";
       }
       else if(e.key == 'ArrowDown')
       {
           snake.direction = "down";
       }
   }

     document.addEventListener('keydown',keypressed);
     


}

function draw()
{
    pen.clearRect(0, 0 ,w,h);
    snake.draw_Snake();

    pen.fillStyle = food.color;
    pen.fillRect(food.x*cl ,food.y*cl,cl,cl );
}

function get_food()
{
    var foodX = Math.round(Math.random()*(w - cl)/cl);
    var foodY = Math.round(Math.random()*(h - cl)/cl);

    var food = {
        x: foodX,
        y : foodY,
        color:"red"
    }

    return food;
}
function updatedisplay()
{

 snake.update_snake();
}

function loop()
{
    if(game_over == true)
    {
        clearInterval(f);
        alert("Game Over");
    }
    draw();
    updatedisplay();
}

init();
var f = setInterval(loop , 100);