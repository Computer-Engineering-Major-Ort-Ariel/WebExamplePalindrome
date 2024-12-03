class Program
{
  static void Main()
  {
    string[] words = [];

    int port = 5000;

    var server = new Server(port);

    Console.WriteLine("The server is running");
    Console.WriteLine($"Main Page: http://localhost:{port}/website/pages/index.html");

    while (true)
    {
      (var request, var response) = server.WaitForRequest();

      Console.WriteLine($"Recieved a request with the path: {request.Path}");

      if (File.Exists(request.Path))
      {
        var file = new File(request.Path);
        response.Send(file);
      }
      else if (request.ExpectsHtml())
      {
        var file = new File("website/pages/404.html");
        response.SetStatusCode(404);
        response.Send(file);
      }
      else
      {
        try
        {
          if (request.Path == "addWord")
          {
            string word = request.GetBody<string>();

            bool hasWord = false;

            for (int i = 0; i < words.Length; i++)
            {
              if (words[i] == word)
              {
                hasWord = true;
              }
            }

            if (!hasWord)
            {
              words = [.. words, word];
            }
          }
          if (request.Path == "getWords")
          {
            response.Send(words);
          }
          else
          {
            Console.WriteLine("405");
            response.SetStatusCode(405);
          }
        }
        catch (Exception exception)
        {
          Log.WriteException(exception);
        }
      }

      response.Close();
    }
  }
}