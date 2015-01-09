defmodule Excess.Supervisor do
  use Supervisor

  def start_link do
    Supervisor.start_link(__MODULE__, :ok)
  end

  @registry_name Excess.Registry
  @room_sup_name Excess.Bucket.Supervisor

  def init(:ok) do
    IO.puts "Started Excess.Supervisor (room data server)"
    children = [
      supervisor(Excess.Room.Supervisor, [[name: @room_sup_name]]),
      worker(Excess.Registry, [@room_sup_name, [name: @registry_name]])
    ]

    supervise(children, strategy: :one_for_one)
  end

end