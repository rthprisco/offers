let slideIndex = 0;
showSlides();

// Função para exibir o slide atual e passar automaticamente para o próximo
function showSlides() {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  
  // Esconde todos os slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  
  slideIndex++;
  // Volta ao primeiro slide depois do último
  if (slideIndex > slides.length) { slideIndex = 1; }
  
  // Remove a classe 'active' de todos os dots
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  // Exibe o slide atual e adiciona a classe 'active' ao dot correspondente
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  
  // Passa para o próximo slide após 5 segundos (5000ms)
  setTimeout(showSlides, 5000); 
}

// Função para quando o usuário clica em um dot específico
function currentSlide(n) {
  slideIndex = n;  // Atualiza o índice do slide manualmente
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  
  // Esconde todos os slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }

  // Remove a classe 'active' de todos os dots
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  // Exibe o slide correspondente ao dot clicado
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
