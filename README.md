# platform_challenge
Terraform Hashicup Provider Challenge
    1  sudo apt update
Install Terraform 
    2  sudo apt-get update && sudo apt-get install -y gnupg software-properties-common
    3  wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
    4  gpg --no-default-keyring --keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg --fingerprint
    5  echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
    6  https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
    7  sudo apt update
    8  sudo apt-get install terraform
    9  sudo apt-get update

Install Docker and Docker Compose
    
   10  sudo apt-get install ca-certificates curl gnupg
   11  sudo install -m 0755 -d /etc/apt/keyrings
   12  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
   13  sudo chmod a+r /etc/apt/keyrings/docker.gpg
   14  echo   "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
   15    "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" |   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   16  sudo apt-get update
   17  sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   18  sudo docker run hello-world
   19  git clone https://github.com/hashicorp/learn-terraform-hashicups-provider && cd learn-terraform-hashicups-provider
   20  cd docker_compose && docker compose up
   21  cd..
   22  cd
   23  wget https://desktop.docker.com/linux/main/amd64/docker-desktop-4.21.1-amd64.deb?utm_source=docker&utm_medium=webreferral&utm_campaign=docs-driven-download-linux-amd64
   24  ls
   25  sudo apt-get install docker-desktop-4.21.1-amd64.deb
   26  wget https://desktop.docker.com/linux/main/amd64/docker-desktop-4.21.1-amd64.deb
   27  sudo apt-get install ./docker-desktop-4.21.1-amd64.deb
   28  cd docker_compose && docker compose up
   29  ls
   30  cd learn-terraform-hashicups-provider
   31  cd docker_compose && docker compose up
   32  sudo docker compose up
   33  ls
   34  cd platform-challenge
   35  ls
   36  npm install @cdktf/provider-null @cdktf/provider-aws
   37  sudo npm install
   38  clear
   39  sudo npm install @cdktf/provider-null
   40  sudo npm install -g aws-cdk
   41  sudo npm install -g aws-cdk-lib
   42  sudo apt update
   43  npm run get
   44  sudo npm install @cdktf/provider-aws
   45  sudo npm install
   46  terraform init
   47  terraform apply
   48  sudo npm install @cdktf/provider-hashicups
   49  sudo npm run build
   50  cdktf deploy
   51  mkdir orders 
   52  cd orders
   53  mkdir order-1
   54  mkdir order-2
   55  cd order-1
   56  echo "2" > Latte.txt
   57  echo "1" > Espresso.txt
   58  cd ..
   59  cd order-2
   60  echo "2" > Latte.txt
   61  echo "1" > Espresso.txt
   62  cd ..
   63  npm run get 
   64  sudo npm run build
   65  cdktf synth
   66  cd ..
   67  cdktf synth
   68  cdktf.out
   69  cdktf diff
   70  cdktf deploy
   71  cdktf destroy
   72  npm run test
   73  npm run upgrade
   74  sudo npm run upgrade
   75  history

Coffee Ordering Platform - Resource Deployment and Deletion
This document provides step-by-step instructions on how to apply and delete the resources for the Coffee Ordering Platform using CDK for Terraform.

Prerequisites
CDK for Terraform installed on your local machine.
Access credentials or keys required to authenticate and access the target infrastructure.
Applying Resources

Open a terminal or command prompt.

Navigate to the root directory of the CDK for Terraform project.

Install the project dependencies by running the following command:

npm install
Synthesize the Terraform configuration files by running the following command:

cdktf synth
This command generates the Terraform configuration based on the CDK for Terraform code and generates the necessary Terraform files.

Review the generated Terraform files located in the cdktf.out directory to ensure they represent the desired infrastructure configuration.

Deploy the infrastructure resources by running the following command:

cdktf deploy
This command applies the Terraform configuration and provisions the resources in the target environment. You may be prompted to confirm the deployment before proceeding.

Monitor the deployment progress and review any outputs or log messages displayed in the terminal.

Once the deployment is complete, you can verify the provisioned resources in the target environment.

Deleting Resources
To delete the resources provisioned by the Coffee Ordering Platform, follow these steps:

Open a terminal or command prompt.

Navigate to the root directory of the CDK for Terraform project.

Run the following command to initiate the deletion process:

cdktf destroy
This command initiates the destruction of the provisioned resources. You may be prompted to confirm the deletion before proceeding.

Monitor the deletion progress and review any outputs or log messages displayed in the terminal.

Once the deletion is complete, verify that the resources have been removed from the target environment.

Cleanup Considerations
Double-check the deletion confirmation prompts to ensure that you are deleting the correct resources.
Verify the successful deletion of all resources in the target environment after running the deletion command.
